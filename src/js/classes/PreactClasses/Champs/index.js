import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import StatsBlock from './StatsBlock';
import TopNav from './TopNav';

@connect((store) => {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading,
    }
})
class Champs extends Component {

	constructor(props) {
		super(props);
		this.regions = ['NALCS', 'EULCS', 'CBLOL', 'LCK', 'LMS', 'TCL', 'OPL']
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
		if(this.props.loading || !this.props.stats) {
			return (
				<div>loading</div>
			)
		} else {
			return (
				<div>
					<TopNav />
					<StatsBlock />
				</div>
			)
		}
	}
}


export default Champs;