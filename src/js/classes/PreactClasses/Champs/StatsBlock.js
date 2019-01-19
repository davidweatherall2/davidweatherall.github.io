import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Stats from './methods/Stats';
import { idToChamp } from './methods/ChampFuncs';

@connect((store) => {
    return {
        stats: store.stats.stats,
        activeRegions: store.stats.activeRegions,
        activePatches: store.stats.activePatches
    }
})
class StatsBlock extends Component {

	constructor(props) {
		super(props);
        this.setState({
            activeRegions: this.props.activeRegions,
            activePatches: this.props.activePatches
        });
        this.statsClass = new Stats(this.props.stats);
        this.calculateStats();
	}

    calculateStats() {
        this.statsClass.setStates(this.state.activeRegions, this.state.activePatches);
        this.statsClass.calculate();
    }

    getPercentage(a, b) {
        const percentage = (a / b) * 100;
        return `${Math.floor(percentage)}%`;
    }

    renderFBChamps() {
        const FBChamps = this.statsClass.getFBChamps();
        if(FBChamps) {
            let FBArray = [];
            Array.from(FBChamps, champ => {
                FBArray.push(
                    <tr>
                        <td>{idToChamp(champ.id)}</td>
                        <td>{champ.played}</td>
                        <td>{this.getPercentage(champ.fbTeam, champ.played)}</td>
                        <td>{this.getPercentage(champ.fbKiller, champ.played)}</td>
                        <td>{this.getPercentage(champ.fbAssist, champ.played)}</td>
                        <td>{this.getPercentage(champ.firstDeath, champ.played)}</td>
                    </tr>
                )
            })
            return FBArray;
        }
    }

	render() {
		return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Champ</th>
                            <th>Games Played</th>
                            <th>First Blood Team</th>
                            <th>First Blood Killer</th>
                            <th>First Blood Assist</th>
                            <th>First Death</th>
                        </tr>
                        {this.renderFBChamps()}
                    </tbody>
                </table>
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        let changed = false;
        if(this.state.activePatches !== newProps.activePatches) {
            this.setState({
                activePatches: newProps.activePatches
            })
            changed = true;
        }

        if(this.state.activeRegions !== newProps.activeRegions) {
            this.setState({
                activeRegions: newProps.activeRegions
            })
            changed = true;
        }
        if(changed) {
            this.calculateStats();
        }
    }
}


export default StatsBlock;