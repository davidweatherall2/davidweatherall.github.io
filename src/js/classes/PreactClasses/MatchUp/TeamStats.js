import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import StatsClass from './StatsClass';

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

	renderGeneralStats() {
		return (
			<div className="matches__columns">
				<div className="matches__column">
					<div>{this.props.team1} First Blood: {this.stats.FB(this.props.team1)}</div>
					<div>{this.props.team1} Red First Blood: {this.stats.redFB(this.props.team1)}</div>
					<div>{this.props.team1} Blue First Blood: {this.stats.blueFB(this.props.team1)}</div>
					<br/>
					<div>{this.props.team2} First Blood: {this.stats.FB(this.props.team2)}</div>
					<div>{this.props.team2} Red First Blood: {this.stats.redFB(this.props.team2)}</div>
					<div>{this.props.team2} Blue First Blood: {this.stats.blueFB(this.props.team2)}</div>
				</div>
				<div className="matches__column">
					<div>{this.props.team1} First Dragon: {this.stats.Dragon(this.props.team1)}</div>
					<div>{this.props.team1} Red First Dragon: {this.stats.redDragon(this.props.team1)}</div>
					<div>{this.props.team1} Blue First Dragon: {this.stats.blueDragon(this.props.team1)}</div>
					<br/>
					<div>{this.props.team2} First Dragon: {this.stats.Dragon(this.props.team2)}</div>
					<div>{this.props.team2} Red First Dragon: {this.stats.redDragon(this.props.team2)}</div>
					<div>{this.props.team2} Blue First Dragon: {this.stats.blueDragon(this.props.team2)}</div>
				</div>
				<div className="matches__column">
					<div>{this.props.team1} First Tower: {this.stats.Tower(this.props.team1)}</div>
					<div>{this.props.team1} Red First Tower: {this.stats.redTower(this.props.team1)}</div>
					<div>{this.props.team1} Blue First Tower: {this.stats.blueTower(this.props.team1)}</div>
					<br/>
					<div>{this.props.team2} First Tower: {this.stats.Tower(this.props.team2)}</div>
					<div>{this.props.team2} Red First Tower: {this.stats.redTower(this.props.team2)}</div>
					<div>{this.props.team2} Blue First Tower: {this.stats.blueTower(this.props.team2)}</div>
				</div>
			</div>
		);
	}

	renderPlayerStats() {
		return '';
	}

	render() {
		return (
			<div>
				<div>{ this.renderGeneralStats() }</div>
				<div>{ this.renderPlayerStats() }</div>
			</div>
		);
	}	
}

export default TeamStats