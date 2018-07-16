import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        activeRegion: store.config.activeRegion,
        regionData: store.regions.regionData
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
		})
	}

	logRegion() {
		console.log(`active Region: ${this.props.activeRegion} and region data first:`);
		console.log(this.props.regionData[0]);
	}

	renderRegions() {
		return (
				<div>
					<div>
						Current Region is {this.props.activeRegion}
					</div>
					<select onChange={(e) => this.updateRegion(e)}>
						<option value='LCK'>LCK</option>
						<option value='EULCS'>EULCS</option>
						<option value='NALCS'>NALCS</option>
					</select>
					<button onClick={this.logRegion.bind(this)}>Click</button>
				</div>			
			);
	}

	render() {
		return (
			<div>
				<div>
					{ this.renderRegions() }
				</div>
				<div>You selected matchup</div>
			</div>
		)
	}
}


export default MatchUp;