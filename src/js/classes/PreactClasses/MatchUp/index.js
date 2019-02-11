import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import MatchElements from './MatchElements';
import TeamStats from './TeamStats';

@connect((store) => {
    return {
		activeRegion: store.config.activeRegion,
		newRegion: store.config.newRegion,
		regionData: store.regions.regionData,
		regionDataLoading: store.regions.statsLoading,
        team1: store.config.team1,
        newTeam1: store.config.newTeam1,
        team2: store.config.team2,
        newTeam2: store.config.newTeam2,
    }
})
class MatchUp extends Component {

	handleUpdateChange(e) {
		this.updateRegion(e.target.value);
	}

	updateRegion(region) {
		this.props.dispatch({
			type: 'UPDATE_REGION',
			payload: fetch(`/api/${region}/light.json`).then(response => response.json())
		});

		this.props.dispatch({
			type: 'UPDATE_REGION_STATS',
			payload: fetch(`/api/${region}/stats.json`).then(response => response.json())
		});

		this.props.dispatch({
			type: 'UPDATE_REGION_TEXT',
			text: region
		});
	}

	handleUpdateTeam1(e) {
		this.updateTeam1(e.target.value);
	}

	handleUpdateTeam2(e) {
		this.updateTeam2(e.target.value);
	}

	updateTeam1(team) {
		console.log('team is ', team);
		this.props.dispatch({
			type: 'UPDATE_TEAM1',
			text: team
		});
	}

	updateTeam2(team) {
		console.log('team is ', team);
		this.props.dispatch({
			type: 'UPDATE_TEAM2',
			text: team
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
				<select onChange={this.handleUpdateChange.bind(this)} value={this.props.activeRegion}>
					<option disabled selected value="">Select Region</option>
					<option value='LCK'>LCK</option>
					<option value='CBLOL'>CBLOL</option>
					<option value='EULCS'>EULCS</option>
					<option value='NALCS'>NALCS</option>
					<option value='TCL'>TCL</option>
					<option value='LMS'>LMS</option>
					<option value='OPL'>OPL</option>
				</select>
			</div>
		);
	}

	renderTeams() {
		const teams = this.getTeams();
		if(teams) {
			return (
				<div>
					<select
					onChange={(e) => this.handleUpdateTeam1(e)} 
					value={this.props.team1 ? this.props.team1 : 'select'}>
						<option selected disabled value='select'>Select Team</option>
						{teams}
					</select>
					<select
					onChange={(e) => this.handleUpdateTeam2(e)}
					value={this.props.team2 ? this.props.team2 : 'select'}>
						<option selected disabled value='select'>Select Team</option>
						{teams}
					</select>
				</div>
			);
		} else {
			return (
				<div>
					<select disabled></select>
					<select disabled></select>
				</div>
			);
		}
	}

	renderMatchup() {
		if(this.props.team1 && this.props.team2) {
			return (
				<MatchElements team1={this.props.team1} team2={this.props.team2} games={this.props.regionData} store={this.props.store}/>
			);
		}
	}

	renderStats() {
		if(this.props.team1 && this.props.team2) {
			return (
				<TeamStats team1={this.props.team1} team2={this.props.team2} store={this.props.store}/>
			);
		}
	}

	renderTeamsVS() {
		if(this.props.team1 && this.props.team2) {
			return (
				<div>
					{this.props.team1} vs {this.props.team2}
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<div class="matches__selects">
					<div>
						{ this.renderRegions() }
					</div>
					<div>
						{this.renderTeams() }
					</div>
				</div>
				<div>
					{this.renderTeamsVS()}
				</div>
				<div>
					{this.renderStats() }
				</div>
				<div>
					{this.renderMatchup() }
				</div>
			</div>
		)
	}

	checkNewRegionOrTeams(newProps) {
		if(newProps.regionDataLoading) return;
		if(newProps.newRegion && newProps.newRegion !== this.props.activeRegion) {
			this.updateRegion(newProps.newRegion);
		} else if(newProps.newRegion && newProps.newRegion === this.props.activeRegion) {
			this.props.dispatch({
				type: 'RESET_NEW_REGION'
			})
		} else if(newProps.newTeam1 || newProps.newTeam2) {
			console.log('new props are ', newProps);
			if(newProps.newTeam1) {
				this.updateTeam1(newProps.newTeam1);
			}
			if(newProps.newTeam2) {
				this.updateTeam2(newProps.newTeam2);
			}
			setTimeout(() => {
				this.props.dispatch({
					type: 'RESET_NEW_TEAMS'
				})
			}, 0);
		}
	}

	componentWillReceiveProps(newProps) {
		this.checkNewRegionOrTeams(newProps);
	}
}


export default MatchUp;