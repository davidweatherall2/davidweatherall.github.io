import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading,
    }
})
class Champs extends Component {

	constructor(props) {
		super(props);
		this.regions = ['CBLOL', 'EULCS', 'LCK', 'NALCS']
		if(!this.props.stats) {
			this.fetchStats();
		}
	}

	fetchStats() {
		Array.from(this.regions, region => {
			this.props.dispatch({
				type: 'FETCH_STATS',
				payload: fetch(`/api/${region}/full.json`).then(response => response.json()),
				meta: region
			});
		})
	}

	render() {
		if(this.state.loading) {
			return (
				<div>loading</div>
			)
		} else {
			return (
				<div>You selected champs</div>
			)
		}
}


export default Champs;