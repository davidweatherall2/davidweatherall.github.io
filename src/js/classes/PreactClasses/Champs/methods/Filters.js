class Filters {
    constructor(stats) {
        console.log('stats are ', stats);
        this.stats = stats;
        this.regions = Object.keys(stats);
    }

    getRegions() {
        return this.regions;
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