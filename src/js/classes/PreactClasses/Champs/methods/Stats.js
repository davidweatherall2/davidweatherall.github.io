import { idToChamp } from './ChampFuncs';

class Stats {
    constructor(stats) {
        this.stats = stats;
        this.setDefaultOrder();
    }

    isDefaultOrder() {
        return (this.orderBy === 'alphabetically' &&
            this.orderByVariable === 'alphabetically' &&
            this.orderDirection === 'asc');
    }

    setDefaultOrder() {
        this.orderBy = 'alphabetically';
        this.orderByVariable = 'alphabetically';
        this.orderDirection = 'asc';
        this.orderChamps();
    }

    setStates(regions, patches) {
        this.regions = regions;
        this.patches = patches;
    }

    setOrder(variable) {
        if(this.orderBy === variable.type && this.orderByVariable === variable.statName) {
            this.orderDirection = (this.orderDirection === 'desc') ? 'asc' : 'desc';
        } else {
            this.orderBy = variable.type;
            this.orderByVariable = variable.statName;
            this.orderDirection = variable.defaultOrder;
        }
        this.orderChamps();
    }

    getOrderVariable() {
        return this.orderByVariable;
    }

    calculate() {
        this.calculateChamps();
    }

    calculateChamps() {
        this.firstChampsObject = {}
        Array.from(this.regions, region => {
            const regionMatches = this.stats[region];
            Array.from(regionMatches, match => {
                if(this.patches.includes(match.patch)) {
                    this.addStats(match);
                }
            })
        });
        this.orderChamps();
    }

    getPercentage(a, b) {
        const percentage = (a / b) * 100;
        return `${Math.floor(percentage)}%`;
    }

    orderChamps() {
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
        
        if(this.orderBy === 'percent') {
            valA = a[this.orderByVariable] / a.played;
            valB = b[this.orderByVariable] / b.played;
        } else if(this.orderBy === 'alphabetically') {
            valA = idToChamp(a.id);
            valB = idToChamp(b.id);
        } else if(this.orderBy === 'value') {
            valA = a[this.orderByVariable];
            valB = b[this.orderByVariable];
        }

        if (valA < valB) {
            return (this.orderDirection === 'asc') ? -1 : 1;
        }
        if (valA > valB) {
            return (this.orderDirection === 'asc') ? 1 : -1;
        }
        return 0;
    }

    addStats(match) {
        for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
            const player = match['players'][playerIndex];
            const champId = player.champId;
            if(this.firstChampsObject[champId] === undefined) {
                this.firstChampsObject[champId] = this.getDefaultStat();
            }
            this.firstChampsObject[champId]['played']++;
            if(this.playedGotVariable(match.firstBlood, playerIndex)) {
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
            if(this.playedGotVariable(match.firstTower, playerIndex)) {
                this.firstChampsObject[champId]['ftTeam']++;
            }
            if(player.firstTowerKill || player.firstTowerAssist) {
                this.firstChampsObject[champId]['ftKiller']++;
            }
            if(this.playedGotVariable(match.firstDragon, playerIndex)) {
                this.firstChampsObject[champId]['fdTeam']++;
            }
            if(this.playedGotVariable(match.win, playerIndex)) {
                this.firstChampsObject[champId]['win']++;
            }
        }
    }

    playedGotVariable(firstTeam, playerIndex) {
        return (firstTeam === 0 && playerIndex < 5) || (firstTeam === 1 && playerIndex > 4)
    }

    getDefaultStat() {
        return {
            played: 0,
            fbTeam: 0,
            ftTeam: 0,
            fdTeam: 0,
            fbKiller: 0,
            fbAssist: 0,
            firstDeath: 0,
            ftKiller: 0,
            win: 0
        }
    }

    getChamps() {
        return this.fbArray;
    }
}

export default Stats;