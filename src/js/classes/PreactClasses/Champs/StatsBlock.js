import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Stats from './methods/Stats';
import { idToChamp } from './methods/ChampFuncs';

@connect((store) => {
    return {
        stats: store.stats.stats,
        activeRegions: store.stats.activeRegions,
        activePatches: store.stats.activePatches,
        activeVariables: store.stats.activeVariables,
        minPlayed: store.stats.minPlayed
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

    renderChampColumns() {
        let columns = [];
        Array.from(this.props.activeVariables, variable => {
            columns.push(<th>{variable.friendlyName}</th>)
        })
        return columns;
    }

    renderChampCells(champ) {
        let cells = [];

        Array.from(this.props.activeVariables, variable => {
            let cell = '';
            if(variable.type === 'percent') {
                cell = <td>{this.getPercentage(champ[variable.statName], champ.played)}</td>
            }
            if(variable.type === 'value') {
                cell = <td>{champ[variable.statName]}</td>
            }
            cells.push(cell);
        })
        return cells;
    }

    renderfirstChamps() {
        const firstChamps = this.statsClass.getChamps();
        if(firstChamps) {
            let firstArray = [];
            Array.from(firstChamps, champ => {
                if(this.props.minPlayed && this.props.minPlayed > champ.played) return;
                firstArray.push(
                    <tr>
                        <td>{idToChamp(champ.id)}</td>
                        {this.renderChampCells(champ)}
                    </tr>
                )
            })
            return firstArray;
        }
    }

	render() {
		return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Champ</th>
                            {this.renderChampColumns()}
                        </tr>
                        {this.renderfirstChamps()}
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