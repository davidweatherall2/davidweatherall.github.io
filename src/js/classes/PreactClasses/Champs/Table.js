import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import { idToChamp } from './methods/ChampFuncs';

@connect((store) => {
    return {
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
        this.props.setOrder(variable);
    }

    isColumnActive(variable) {
        if(variable.statName === this.props.getOrderVariable()) {
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
        if(this.props.champsArray) {
            let firstArray = [];
            Array.from(this.props.champsArray, champ => {
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