class StatsClass {
	constructor(stats) {
		this.stats = stats;
	}

	FB(team) {
		const fb = Math.round(100 * (this.stats[team].firstBloods / this.stats[team].matchesPlayed))
		const fbString = String(fb) + '%'
		return fbString
	}

	blueFB(team) {
		const fb = Math.round(100 * (this.stats[team].blueFirstBloods / this.stats[team].blueMatchesPlayed))
		const fbString = String(fb) + '%'
		return fbString
	}

	redFB(team) {
		const fb = Math.round(100 * (this.stats[team].redFirstBloods / this.stats[team].redMatchesPlayed))
		const fbString = String(fb) + '%'
		return fbString
	}

	Tower(team) {
		const Tower = Math.round(100 * (this.stats[team].firstTowers / this.stats[team].matchesPlayed))
		const TowerString = String(Tower) + '%'
		return TowerString
	}

	blueTower(team) {
		const Tower = Math.round(100 * (this.stats[team].blueFirstTowers / this.stats[team].blueMatchesPlayed))
		const TowerString = String(Tower) + '%'
		return TowerString
	}

	redTower(team) {
		const Tower = Math.round(100 * (this.stats[team].redFirstTowers / this.stats[team].redMatchesPlayed))
		const TowerString = String(Tower) + '%'
		return TowerString
	}

	Dragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].firstDragons / this.stats[team].matchesPlayed))
		const DragonString = String(Dragon) + '%'
		return DragonString
	}

	blueDragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].blueFirstDragons / this.stats[team].blueMatchesPlayed))
		const DragonString = String(Dragon) + '%'
		return DragonString
	}

	redDragon(team) {
		const Dragon = Math.round(100 * (this.stats[team].redFirstDragons / this.stats[team].redMatchesPlayed))
		const DragonString = String(Dragon) + '%'
		return DragonString
	}
}

export default StatsClass;