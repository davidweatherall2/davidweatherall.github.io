import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        activePatches: store.stats.activePatches
    }
})
class Patches extends Component {

	constructor(props) {
		super(props);
        this.setDefaultPatches();
	}

    setDefaultPatches() {
        this.props.dispatch({
            type: 'SET_ALL_PATCHES',
            patches: this.props.patches
        });
    }

    isPatchActive(patch) {
        if(this.props.activePatches && this.props.activePatches.includes(patch)) {
            return 'checked';
        }
        return '';
    }

    togglePatch(patch) {
        let activePatches = Object.assign([], this.props.activePatches);
        if(this.props.activePatches.includes(patch)) {
            activePatches = activePatches.filter(activePatch => activePatch !== patch)
        } else {
            activePatches.push(patch);
        }
        this.props.dispatch({
            type: 'SET_ALL_PATCHES',
            patches: activePatches
        })
    }

    renderPatches() {
        let patches = [];
        Array.from(this.props.patches, patch => {
            patches.push(
                <div>
                    <input onChange={() => { this.togglePatch(patch)}} checked={this.isPatchActive(patch)} id={`patch-${patch}`} type="checkbox" />
                    <label for={`patch-${patch}`}>{patch}</label>
                </div>
            )
        });
        return patches;
    }

	render() {
		return (
            <div>
                {this.renderPatches()}
            </div>
        )
    }
}


export default Patches;