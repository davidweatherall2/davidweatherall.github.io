import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Filters from './methods/Filters';

import Patches from './Patches';
import Regions from './Regions';
import Variables from './Variables';
import MinPlayed from './MinPlayed';

@connect((store) => {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading,
    }
})
class TopNav extends Component {

	constructor(props) {
		super(props);

        this.filters = new Filters(this.props.stats);

        this.regions = this.filters.getRegions();
        this.patches = this.filters.getPatches();
        this.variables = this.filters.getVariables();
	}

	render() {
		return (
            <div className="topnav__holder">
                <div className="topnav">
                    <div className="topnav__dropdown">
                        <div className="topnav__title">Patches</div>
                        <Patches patches={this.patches}/>
                    </div>
                    <div className="topnav__dropdown">
                        <div className="topnav__title">Regions</div>
                        <Regions regions={this.regions}/>
                    </div>
                    <div className="topnav__dropdown">
                        <div className="topnav__title">Variables</div>
                        <Variables variables={this.variables}/>
                    </div>
                    <div className="topnav__dropdown">
                        <div className="topnav__title">Min Played</div>
                        <MinPlayed />
                    </div>
                </div>
            </div>
        );
    }
}


export default TopNav;