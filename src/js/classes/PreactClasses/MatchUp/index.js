import { h, render, Component } from 'preact';

class MatchUp extends Component {


	updateRegion(e) {
		console.log(this.props.store);
		console.log(e.target.value);
	}

	renderRegions() {
		return (
				<div>
					<select onChange={(e) => this.updateRegion(e)}>
						<option value='LCK'>LCK</option>
						<option value='EULCS'>EULCS</option>
						<option value='NALCS'>NALCS</option>
					</select>
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