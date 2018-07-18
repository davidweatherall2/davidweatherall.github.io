import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import MatchElements from './MatchElements';

@connect((store) => {
    return {
        activeRegion: store.config.activeRegion,
        regionData: store.regions.regionData,
        team1: store.config.team1,
        team2: store.config.team2,
    }
})
class MatchUp extends Component {

	updateRegion(e) {
		this.props.dispatch({
			type: 'UPDATE_REGION',
			payload: fetch(`/api/${e.target.value}/light.json`).then(response => response.json())
		});

		this.props.dispatch({
			type: 'UPDATE_REGION_TEXT',
			text: e.target.value
		});
	}

	updateTeam1(e) {
		this.props.dispatch({
			type: 'UPDATE_TEAM1',
			text: e.target.value
		});
	}

	updateTeam2(e) {
		this.props.dispatch({
			type: 'UPDATE_TEAM2',
			text: e.target.value
		});
	}

	getTeams() {
		if(this.props.regionData) {
			let teams = [];
			let options = [];
			Array.from(this.props.regionData, (game) => {
				const team1 = game['teamNames'][0];
				const team2 = game['teamNames'][1];

				if(!teams.includes(team1)) {
					teams.push(team1);
				}
				if(!teams.includes(team2)) {
					teams.push(team2);
				}
			});

			teams.sort();

			Array.from(teams, (team) => {
				options.push(<option value={team}>{team}</option>);
			});

			return options;
		}

		return false;
	}

	renderRegions() {
		return (
				<div>
					<div>
						Current Region is {this.props.activeRegion}
					</div>
					<select onChange={(e) => this.updateRegion(e)}>
						<option disabled selected>Select Region</option>
						<option value='LCK'>LCK</option>
						<option value='EULCS'>EULCS</option>
						<option value='NALCS'>NALCS</option>
					</select>
					<button>Click</button>
				</div>
			);
	}

	renderTeams() {
		const teams = this.getTeams();
		if(teams) {
			return (
				<div>
					<select
					onChange={(e) => this.updateTeam1(e)} 
					value={this.props.team1 ? this.props.team1 : 'select'}>
						<option selected disabled value='select'>Select Team</option>
						{teams}
					</select>
					<select
					onChange={(e) => this.updateTeam2(e)}
					value={this.props.team2 ? this.props.team2 : 'select'}>
						<option selected disabled value='select'>Select Team</option>
						{teams}
					</select>
				</div>
				)
		}
	}

	renderMatchup() {
		if(this.props.team1 && this.props.team2) {
			return (
				<MatchElements team1={this.props.team1} team2={this.props.team2} games={this.props.regionData}/>
			);
		} else {
			return (
				<div>Team 1 and 2 not selected</div>
			);
		}
	}

	render() {
		return (
			<div>
				<div>
					{ this.renderRegions() }
				</div>
				<div>
					{this.renderTeams() }
				</div>
				<div>
					{this.renderMatchup() }
				</div>
			</div>
		)
	}
}


export default MatchUp;