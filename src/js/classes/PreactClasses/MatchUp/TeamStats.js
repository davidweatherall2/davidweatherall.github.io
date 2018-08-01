import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import StatsClass from './StatsClass';
import StatCircle from './StatCircle';

@connect((store) => {
    return {
        activeRegion: store.config.activeRegion,
        regionStats: store.regions.regionStats,
        team1: store.config.team1,
        team2: store.config.team2,
    }
})

class TeamStats extends Component {

	constructor(props) {
		super(props);

		this.stats = new StatsClass(this.props.regionStats);
	}

	getPlayerFBStats(teamName) {
		const team = this.props.regionStats[teamName];
		let players = [];
		for (const player in team.playersMatchesPlayed) {
			console.log(player);
			const matchesPlayed = team.playersMatchesPlayed[player];
			const firstBlood = 100 * ((team.firstBloodPlayers[player] + team.firstBloodAssistPlayers[player]) / matchesPlayed);
			const firstBloodString = parseInt(firstBlood);
			
			const firstDeath = 100 * (team.firstDeathPlayers[player] / matchesPlayed);
			const firstDeathString = parseInt(firstDeath);

			players.push(
				<tr>
					<td>{player.replace(teamName, '')}</td>
					<td>{firstBloodString}</td>
					<td>{firstDeathString}</td>
					<td>{matchesPlayed}</td>
				</tr>
			);
		}

		return (
			<table class="matches__table">
				<tr>
					<th></th>
					<th>FB%</th>
					<th>FD%</th>
					<th>SS</th>
				</tr>
				{players}
			</table>

		);
	}

	renderCircleStats() {
		return (
			<div className="matches__columns">
				<div className="matches__column">

					<h2>First Blood:</h2>

					<div class="matches__columns">

						<div class="matches__column  matches__column--half">

							<h3>{this.props.team1}</h3>

							<StatCircle
								blue={this.stats.blueFB(this.props.team1)}
								red={this.stats.redFB(this.props.team1)}
								fbText={`${this.stats.FB(this.props.team1)}%`}
							/>

						</div>

						<div class="matches__column  matches__column--half">
							<h3>{this.props.team2}</h3>

							<StatCircle
								blue={this.stats.blueFB(this.props.team2)}
								red={this.stats.redFB(this.props.team2)}
								fbText={`${this.stats.FB(this.props.team2)}%`}
							/>
						</div>
					</div>
				</div>
				<div className="matches__column">

					<h2>First Dragon:</h2>

					<div class="matches__columns">

						<div class="matches__column  matches__column--half">

							<h3>{this.props.team1}</h3>

							<StatCircle
								blue={this.stats.blueDragon(this.props.team1)}
								red={this.stats.redDragon(this.props.team1)}
								fbText={`${this.stats.Dragon(this.props.team1)}%`}
							/>

						</div>

						<div class="matches__column  matches__column--half">

							<h3>{this.props.team2}</h3>

							<StatCircle
								blue={this.stats.blueDragon(this.props.team2)}
								red={this.stats.redDragon(this.props.team2)}
								fbText={`${this.stats.Dragon(this.props.team2)}%`}
							/>

						</div>

					</div>

				</div>
				<div className="matches__column">

					<h2>First Tower:</h2>

					<div class="matches__columns">

						<div class="matches__column  matches__column--half">

							<h3>{this.props.team1}</h3>

							<StatCircle
								blue={this.stats.blueTower(this.props.team1)}
								red={this.stats.redTower(this.props.team1)}
								fbText={`${this.stats.Tower(this.props.team1)}%`}
							/>

						</div>

						<div class="matches__column  matches__column--half">

							<h3>{this.props.team2}</h3>

							<StatCircle
								blue={this.stats.blueTower(this.props.team2)}
								red={this.stats.redTower(this.props.team2)}
								fbText={`${this.stats.Tower(this.props.team2)}%`}
							/>

						</div>

					</div>

				</div>
			</div>
		);
	}

	renderPlayerStats() {
		return (
			<div className="matches__columns">
				<div className="matches__column">

					<div class="matches__columns">

						<div class="matches__column  matches__column--half  bdr-right">

							{this.getPlayerFBStats(this.props.team1)}

						</div>

						<div class="matches__column  matches__column--half">
							{this.getPlayerFBStats(this.props.team2)}
						</div>
					</div>
				</div>
				<div className="matches__column">

					<div class="matches__columns">

						<div class="matches__column  matches__column--half">

							

						</div>

						<div class="matches__column  matches__column--half">

							

						</div>

					</div>

				</div>
				<div className="matches__column">

					<div class="matches__columns">

						<div class="matches__column  matches__column--half">

							

						</div>

						<div class="matches__column  matches__column--half">

							

						</div>

					</div>

				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				<div>{ this.renderCircleStats() }</div>
				<div>{ this.renderPlayerStats() }</div>
			</div>
		);
	}	
}

export default TeamStats