import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

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
class Table extends Component {

	constructor(props) {
		super(props);
	}

	getPercentage(a, b) {
        const percentage = (a / b) * 100;
        return `${Math.floor(percentage)}%`;
    }

    setActiveColumn(variable) {
        this.props.statsClass.setOrder(variable);
        this.updateChampQuery();
    }

    checkFirstChamps() {
        console.log(this.state.champs);
        if(!this.state.champs && this.props.statsClass) {
            this.updateChampQuery();
        }
    }

    updateChampQuery() {
        this.setState({
            champs: this.props.statsClass.getChamps()
        });
    }

    isColumnActive(variable) {
        if(this.props.statsClass && variable.statName === this.props.statsClass.getOrderVariable()) {
            return true;
        }
        return false;
    }

    renderChampColumns() {
        let columns = [];
        Array.from(this.props.activeVariables, variable => {
            columns.push(<th className={this.isColumnActive(variable) ? 'is-active' : ''} onClick={() => this.setActiveColumn(variable)}>{variable.friendlyName}</th>)
        })
        return columns;
    }

    renderChampCells(champ) {
        console.log('render new');
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
        this.checkFirstChamps();
        if(this.state.champs) {
            let firstArray = [];
            Array.from(this.state.champs, champ => {
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
	
	checkStatsUpdated() {
		if(!(this.props.statsClass.getChamps() === this.state.champs)) {
			this.updateChampQuery();
		}
	}

	render() {
		this.checkStatsUpdated();
        const champColumn = {type : 'alphabetically', defaultOrder : 'asc', statName : 'alphabetically'}
		return (
            <div className="table__holder">
                <table className="table">
                    <tbody>
                        <tr>
                            <th className={this.isColumnActive(champColumn) ? 'is-active' : ''} onClick={() => this.setActiveColumn(champColumn)}>Champ</th>
                            {this.renderChampColumns()}
                        </tr>
                        {this.renderfirstChamps()}
                    </tbody>
                </table>
            </div>
        )
	}
	
}


export default Table;