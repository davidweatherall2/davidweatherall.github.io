import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Players from './Players';

@connect((store) => {
    return {
        activeRegion: store.config.activeRegion,
        regionData: store.regions.regionData,
        team1: store.config.team1,
        team2: store.config.team2,
    }
})
class MatchCard extends Component {

	constructor(props) {
		super(props);
		if(this.props.team) {
			this.index = 0;
			this.enemyIndex = 1;
			if(this.props.game.teamNames[1] == this.props.team) {
				this.index = 1;
				this.enemyIndex = 0;
			}
		} else {
			this.index = false;
		}

		this.setState({showPlayers: false})

		this.teamColours = ['blue', 'red'];
	}

	getTime(unix) {
		const date = new Date(unix);
		return date.toLocaleString([], {day: 'numeric', month: 'long', year: 'numeric'});
	}

	togglePlayers() {
		this.setState({showPlayers: !this.state.showPlayers});
	}

	getBackground() {
		if(this.props.team) {
			return `bg-color--${this.teamColours[this.index]}`;
		}
		return `bg-color--default`;
	}

	getBorder() {
		if(this.index !== false) {
			if(this.props.game.win == this.index) {
				return `bdr-color--green`;
			} else {
				return `bdr-color--red`;
			}
		} else {
			console.log(`skipping coz this.index is ${this.index}`)
			return `bdr-color--greyer`;
		}
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
					classes = 't-colour--' + this.teamColours[teamNum];
				}
				achievements.push(<div className={classes}>{checks[check]}</div>);
			}
		};

		return achievements;
	}

	renderMatchup() {
		let team1 = this.props.game.teamNames[0];
		let team2 = this.props.game.teamNames[1];
		
		if(this.props.team) {
			if(this.props.game.teamNames[0] != this.props.team) {
				team2 = this.props.game.teamNames[0];
				team1 = this.props.game.teamNames[1];
			}
		}

		return (
			<div className="matches__column  flex  flex-justify--between">
				<span>
					{team1}
				</span>
				<span>
					vs
				</span>
				<span>
					{team2}
				</span>
			</div>
		);
	}

	renderShowMore() {
		return (
			<div className="card__showmore" onClick={this.togglePlayers.bind(this)}>Show More</div>
		)
	}

	renderPlayers() {
		if(this.state.showPlayers) {
			console.log('showing');
			return (
				<Players game={this.props.game} index={this.index} activeRegion={this.props.activeRegion}/>
			);
		}
		return '';
	}

	render() {
		return (
			<div className={`card  ${this.getBackground()}  ${this.getBorder()}`}> 
				<div className="card__date">
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
				{this.renderPlayers()}
				{this.renderShowMore()}
			</div>
		)
	}
}


export default MatchCard;