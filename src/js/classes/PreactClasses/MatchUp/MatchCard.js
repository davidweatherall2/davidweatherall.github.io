import { h, render, Component } from 'preact';

class MatchCard extends Component {

	getTime(unix) {
		const date = new Date(unix);
		return date.toLocaleString([], {day: 'numeric', month: 'long', year: 'numeric'});
	}

	renderAchievements(teamNum) {
		const checks = ['firstBaron', 'firstBlood', 'firstDragon', 'firstInhibitor', 'firstTower'];
		let achievements = [];
		Array.from(checks, (check) => {
			if(this.props.game[check] == teamNum) {
				achievements.push(<div>{check}</div>);
			}
		});

		return achievements;
	}

	render() {
		return (
			<div class="matches__card">
				<div class="matches__card__date">
					{this.getTime(this.props.game.time)}
				</div>
				<div class="matches__columns  flex-align--center">
					<div class="matches__column  t-size--small">
						{this.renderAchievements(0)}
					</div>
					<div class="matches__column  flex  flex-justify--between">
						<span>
							{this.props.game.teamNames[0]}
						</span>
						<span>
							vs
						</span>
						<span>
							{this.props.game.teamNames[1]}
						</span>
					</div>
					<div class="matches__column  t-align--right  t-size--small">
						{this.renderAchievements(1)}
					</div>
				</div>
			</div>
		)
	}
}


export default MatchCard;