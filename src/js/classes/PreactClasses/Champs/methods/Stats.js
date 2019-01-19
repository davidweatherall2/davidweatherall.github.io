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
        this.calculateFBChamps();
    }

    calculateFBChamps() {
        this.fbChampsObject = {}
        Array.from(this.regions, region => {
            const regionMatches = this.stats[region];
            Array.from(regionMatches, match => {
                if(this.patches.includes(match.patch)) {
                    this.addFBStats(match);
                }
            })
        });
        this.orderFBChamps();
    }

    orderFBChamps() {
        this.fbArray = [];
        for(const champId in this.fbChampsObject) {
            let champ = this.fbChampsObject[champId];
            champ['id'] = champId;
            this.fbArray.push(champ);
        }
        this.fbArray.sort(this.sortFBByPercentage);
    }

    sortFBByPercentage(a, b) {
        var percentA = a.fbTeam / a.played;
        var percentB = b.fbTeam / b.played;
        if (percentA > percentB) {
            return -1;
        }
        if (percentA < percentB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

    addFBStats(match) {
        for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
            const player = match['players'][playerIndex];
            const champId = player.champId;
            if(this.fbChampsObject[champId] === undefined) {
                this.fbChampsObject[champId] = this.getDefaultFBStat();
            }
            this.fbChampsObject[champId]['played']++;
            if(this.gotFirstBlood(match.firstBlood, playerIndex)) {
                this.fbChampsObject[champId]['fbTeam']++;
            }
            if(player.firstBloodKill) {
                this.fbChampsObject[champId]['fbKiller']++;
            }
            if(player.firstBloodAssist) {
                this.fbChampsObject[champId]['fbAssist']++;
            }
            if(player.firstDeath) {
                this.fbChampsObject[champId]['firstDeath']++;
            }
        }
    }

    gotFirstBlood(fbTeam, playerIndex) {
        return (fbTeam === 0 && playerIndex < 5) || (fbTeam === 1 && playerIndex > 4)
    }

    getDefaultFBStat() {
        return {
            played: 0,
            fbTeam: 0,
            fbKiller: 0,
            fbAssist: 0,
            firstDeath: 0
        }
    }

    getFBChamps() {
        return this.fbArray;
    }
}

export default Stats;