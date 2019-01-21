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
            {statName: 'fbTeam', friendlyName: 'First Blood Team', type: 'percent'},
            {statName: 'fbKiller', friendlyName: 'First Blood Killer', type: 'percent'},
            {statName: 'fbAssist', friendlyName: 'First Blood Assist', type: 'percent'},
            {statName: 'firstDeath', friendlyName: 'First Death', type: 'percent'},
            {statName: 'ftTeam', friendlyName: 'First Tower Team', type: 'percent'},
            {statName: 'ftKiller', friendlyName: 'First Tower Killer', type: 'percent'},
            {statName: 'fdTeam', friendlyName: 'First Dragon Team', type: 'percent'},
            {statName: 'played', friendlyName: 'Games Played', type: 'value'},
            {statName: 'win', friendlyName: 'Win', type: 'percent'}
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