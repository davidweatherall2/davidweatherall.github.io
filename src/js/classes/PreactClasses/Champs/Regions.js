import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        activeRegions: store.stats.activeRegions
    }
})
class Regions extends Component {

	constructor(props) {
		super(props);
        this.setDefaultRegions();
	}

    setDefaultRegions() {
        this.props.dispatch({
            type: 'SET_ALL_REGIONS',
            regions: this.props.regions
        })
    }

    isRegionActive(region) {
        if(this.props.activeRegions && this.props.activeRegions.includes(region)) {
            return 'checked';
        }
        return '';
    }

    toggleRegion(region) {
        let activeRegions = Object.assign([], this.props.activeRegions);
        if(this.props.activeRegions.includes(region)) {
            activeRegions = activeRegions.filter(activeRegion => activeRegion !== region)
        } else {
            activeRegions.push(region);
        }
        this.props.dispatch({
            type: 'SET_ALL_REGIONS',
            regions: activeRegions
        })
    }

    renderRegions() {
        let regions = [];
        Array.from(this.props.regions, region => {
            regions.push(
                <div>
                    <input onChange={() => { this.toggleRegion(region)}} checked={this.isRegionActive(region)} id={`region-${region}`} type="checkbox" />
                    <label for={`region-${region}`}>{region}</label>
                </div>
            )
        });
        return regions;
    }

	render() {
		return (
            <div>
                {this.renderRegions()}
            </div>
        )
    }
}


export default Regions;