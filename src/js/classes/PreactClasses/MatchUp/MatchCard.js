import { h, render, Component } from 'preact';

class MatchCard extends Component {

	constructor(props) {
		super(props);
		this.index = 0;
		this.enemyIndex = 1;
		if(this.props.team && this.props.game.teamNames[1] == this.props.team) {
			this.index = 1;
			this.enemyIndex = 0;
		}
	}

	getTime(unix) {
		const date = new Date(unix);
		return date.toLocaleString([], {day: 'numeric', month: 'long', year: 'numeric'});
	}

	renderAchievements(teamNum, myTeam = false) {
		let isMyTeam = false;
		if(myTeam) {
			if(this.props.game.teamNames[teamNum] == myTeam) {
				isMyTeam = true; 
			}
		}
		const checks = 	{
							'firstBaron' : 'First Baron',
							'firstBlood' : 'First Blood',
							'firstDragon' : 'First Dragon',
							'firstInhibitor' : 'First Inhibitor',
							'firstTower' : 'First Tower'
						};
		let achievements = [];
		for (const check in checks) {
			if(this.props.game[check] == teamNum) {
				let classes = '';
				if(myTeam) {
					if (isMyTeam) {
						classes = 't-colour--green';
					} else {
						classes = 't-colour--red';
					}
				} else {
					const teamColours = ['blue', 'red'];
					classes = 't-colour--' + teamColours[teamNum];
				}
				achievements.push(<div className={classes}>{checks[check]}</div>);
			}
		};

		return achievements;
	}

	renderMatchup() {
		let team1 = this.props.game.teamNames[0];
		let team2 = this.props.game.teamNames[1];
		let team1colour = 't-colour--blue';
		let team2colour = 't-colour--red';
		
		if(this.props.team) {
			if(this.props.game.teamNames[0] != this.props.team) {
				team2 = this.props.game.teamNames[0];
				team1 = this.props.game.teamNames[1];
				team1colour = 't-colour--red';
				team2colour = 't-colour--blue';
			}
		}

		return (
			<div className="matches__column  flex  flex-justify--between">
				<span className={team1colour}>
					{team1}
				</span>
				<span>
					vs
				</span>
				<span className={team2colour}>
					{team2}
				</span>
			</div>
		);
	}

	render() {
		return (
			<div className="matches__card">
				<div className="matches__card__date">
					{this.getTime(this.props.game.time)}
				</div>
				<div className="matches__columns  flex-align--center">
					<div className="matches__column  t-size--small">
						{this.renderAchievements(this.index, this.props.team)}
					</div>
					{this.renderMatchup()}
					<div className="matches__column  t-align--right  t-size--small">
						{this.renderAchievements(this.enemyIndex, this.props.team)}
					</div>
				</div>
			</div>
		)
	}
}


export default MatchCard;