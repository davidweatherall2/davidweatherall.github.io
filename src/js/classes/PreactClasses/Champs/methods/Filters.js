class Filters {
    constructor(stats) {
        this.stats = stats;
        this.regions = Object.keys(stats);
    }

    getRegions() {
        return this.regions;
    }

    getVariables() {
        return [
            {statName: 'fbTeam', friendlyName: 'First Blood Team', type: 'percent', defaultOrder : 'desc'},
            {statName: 'fbKiller', friendlyName: 'First Blood Killer', type: 'percent', defaultOrder : 'desc'},
            {statName: 'fbAssist', friendlyName: 'First Blood Assist', type: 'percent', defaultOrder : 'desc'},
            {statName: 'firstDeath', friendlyName: 'First Death', type: 'percent', defaultOrder : 'desc'},
            {statName: 'ftTeam', friendlyName: 'First Tower Team', type: 'percent', defaultOrder : 'desc'},
            {statName: 'ftKiller', friendlyName: 'First Tower Killer', type: 'percent', defaultOrder : 'desc'},
            {statName: 'fdTeam', friendlyName: 'First Dragon Team', type: 'percent', defaultOrder : 'desc'},
            {statName: 'played', friendlyName: 'Games Played', type: 'value', defaultOrder : 'desc'},
            {statName: 'win', friendlyName: 'Win', type: 'percent', defaultOrder : 'desc'}
        ];
    }

    getPatches() {
        if(this.patches) {
            return this.patches;
        }
        this.patches = [];
        Array.from(this.regions, region => {
            const regionMatches = this.stats[region];
            Array.from(regionMatches, match => {
                if(!this.patches.includes(match.patch)) {
                    this.patches.push(match.patch);
                }
            })
        })

        return this.patches;
    }
}

export default Filters;