class Stats {
    constructor(stats) {
        this.stats = stats;
        this.orderBy = 'fbPercentage';
    }

    setStates(regions, patches) {
        this.regions = regions;
        this.patches = patches;
    }

    calculate() {
        this.calculateFirstChamps();
    }

    calculateFirstChamps() {
        this.firstChampsObject = {}
        Array.from(this.regions, region => {
            const regionMatches = this.stats[region];
            Array.from(regionMatches, match => {
                if(this.patches.includes(match.patch)) {
                    this.addFirstStats(match);
                }
            })
        });
        this.orderFirstChamps();
    }

    getPercentage(a, b) {
        const percentage = (a / b) * 100;
        return `${Math.floor(percentage)}%`;
    }

    orderFirstChamps() {
        this.fbArray = [];
        for(const champId in this.firstChampsObject) {
            let champ = this.firstChampsObject[champId];
            champ['id'] = champId;
            this.fbArray.push(champ);
        }
        this.fbArray.sort(this.sortFunction.bind(this));
    }

    sortFunction(a, b) {
        let valA = '';
        let valB = '';
        if(this.orderBy === 'fbPercentage') {
            valA = a.fbTeam / a.played;
            valB = b.fbTeam / b.played;
        }
        if (valA > valB) {
            return -1;
        }
        if (valA < valB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

    addFirstStats(match) {
        for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
            const player = match['players'][playerIndex];
            const champId = player.champId;
            if(this.firstChampsObject[champId] === undefined) {
                this.firstChampsObject[champId] = this.getDefaultFirstStat();
            }
            this.firstChampsObject[champId]['played']++;
            if(this.gotFirst(match.firstBlood, playerIndex)) {
                this.firstChampsObject[champId]['fbTeam']++;
            }
            if(player.firstBloodKill) {
                this.firstChampsObject[champId]['fbKiller']++;
            }
            if(player.firstBloodAssist) {
                this.firstChampsObject[champId]['fbAssist']++;
            }
            if(player.firstDeath) {
                this.firstChampsObject[champId]['firstDeath']++;
            }
            if(this.gotFirst(match.firstTower, playerIndex)) {
                this.firstChampsObject[champId]['ftTeam']++;
            }
            if(player.firstTowerKill || player.firstTowerAssist) {
                this.firstChampsObject[champId]['ftKiller']++;
            }
            if(this.gotFirst(match.firstDragon, playerIndex)) {
                this.firstChampsObject[champId]['fdTeam']++;
            }
        }
    }

    gotFirst(firstTeam, playerIndex) {
        return (firstTeam === 0 && playerIndex < 5) || (firstTeam === 1 && playerIndex > 4)
    }

    getDefaultFirstStat() {
        return {
            played: 0,
            fbTeam: 0,
            ftTeam: 0,
            fdTeam: 0,
            fbKiller: 0,
            fbAssist: 0,
            firstDeath: 0,
            ftKiller: 0
        }
    }

    getFirstChamps() {
        return this.fbArray;
    }
}

export default Stats;