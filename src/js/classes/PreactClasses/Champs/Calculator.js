import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import { idToChamp } from './methods/ChampFuncs';

@connect((store) => {
    return {
        activeVariables: store.stats.activeVariables
    }
})
class Calculator extends Component {

	constructor(props) {
		super(props);
		this.setState({
			activeChamps: ['', '', '', '', '', '', '', '', '', '']
		})
	}

	handleChange(e, i) {
		let activeChamps = Object.assign([], this.state.activeChamps);
		activeChamps[i] = e.target.value;
		this.setState({
			activeChamps: activeChamps
		});
	}

	checkChamps() {
		const champsArray = this.props.champsArray;
		if(this.state.champsArray !== champsArray) {
			let champsList = [];
			let champsObject = {};
			Array.from(champsArray, champ => {
				champsList.push({
					name: idToChamp(champ.id),
					id: champ.id
				})
				champsObject[champ.id] = champ
			})
			this.setState({
				champsArray: champsArray,
				champsList: champsList,
				champsObject: champsObject
			});
		}
	}

	renderChampSelector(i) {
		let champOptions = [];
		Array.from(this.state.champsList, champ => {
			champOptions.push(<option value={champ.id}>{champ.name}</option>);
		})
		return (
			<div className="calculator__champ-holder">
				<select value={this.state.activeChamps[i]} onChange={(e) => {this.handleChange(e, i)}}>
					<option value=''></option>
					{champOptions}
				</select>
				{this.getChampStats(this.state.activeChamps[i])}
			</div>
		);
	}

	renderChampSelection() {
		this.checkChamps();
		let i = 0;
		let champCells = [];
		while(i < 10) {
			champCells.push(this.renderChampSelector(i));
			i++;
		}
		return (
			<div className="calculator__champs">
				{champCells}
			</div>
		)
	}

	getPercentage(a, b) {
        const percentage = (a / b) * 100;
        return `${Math.floor(percentage)}%`;
    }

	getVariableStat(champId, variable) {
		const champ = this.state.champsObject[champId];
		if(variable.type === 'percent') {
			return this.getPercentage(champ[variable.statName], champ.played);
		}
		if(variable.type === 'value') {
			return champ[variable.statName]
		}
	}

	getChampStats(champId) {
		let champStats = [];
		if(this.state.champsObject && this.state.champsObject[champId]) {
			Array.from(this.props.activeVariables, variable => {
				champStats.push(<li>{variable.friendlyName}: {this.getVariableStat(champId, variable)}</li>)
			});
		} else {
			champStats.push(<li>No stats found</li>)
		}
		return champStats;
	}

	render() {
		return (
			<div>
				{this.renderChampSelection()}
			</div>
		)
	}
}


export default Calculator;