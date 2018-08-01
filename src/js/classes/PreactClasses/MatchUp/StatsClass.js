class StatsClass {
	constructor(stats) {
		this.stats = stats;
	}

	FB(team) {
		const fb = Math.round(100 * (this.stats[team].firstBloods / this.stats[team].matchesPlayed))
		return fb
	}

	blueFB(team) {
		const fb = Math.round(100 * (this.stats[team].blueFirstBloods / this.stats[team].blueMatchesPlayed))
		return fb
		
	}

	redFB(team) {
		const fb = Math.round(100 * (this.stats[team].redFirstBloods / this.stats[team].redMatchesPlayed))
		return fb
	}

	Tower(team) {
		const Tower = Math.round(100 * (this.stats[team].firstTowers / this.stats[team].matchesPlayed))
		return Tower
	}

	blueTower(team) {
		const Tower = Math.round(100 * (this.stats[team].blueFirstTowers / this.stats[team].blueMatchesPlayed))
		return Tower
	}

	redTower(team) {
		const Tower = Math.round(100 * (this.stats[team].redFirstTowers / this.stats[team].redMatchesPlayed))
		return Tower
	}

	Dragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].firstDragons / this.stats[team].matchesPlayed))
		return Dragon
	}

	blueDragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].blueFirstDragons / this.stats[team].blueMatchesPlayed))
		return Dragon
	}

	redDragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].redFirstDragons / this.stats[team].redMatchesPlayed))
		return Dragon
	}
}

export default StatsClass;