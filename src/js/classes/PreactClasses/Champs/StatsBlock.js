import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Stats from './methods/Stats';
import { idToChamp } from './methods/ChampFuncs';

import Calculator from './Calculator';
import Table from './Table';

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
            activePatches: this.props.activePatches,
            active: 'table'
        });
        this.statsClass = new Stats(this.props.stats);
        this.calculateStats();
    }
    
    setDefaultOrder() {
        if(!this.statsClass.isDefaultOrder()) {
            this.statsClass.setDefaultOrder();
            this.calculateStats();
        }
    }

    calculateStats() {
        this.statsClass.setStates(this.state.activeRegions, this.state.activePatches);
        this.statsClass.calculate();
        this.setState({
            champs: this.statsClass.getChamps()
        });
    }

    renderSwitcher() {
        return (
            <div>
                <a onClick={() => { this.setState({active: 'table'})}}>Table</a>
                <a onClick={() => { this.setState({active: 'calculator'})}}>Calculator</a>
            </div>
        );
    }

    getOrderVariable() {
        return this.statsClass.getOrderVariable();
    }

    setOrder(variable) {
        this.statsClass.setOrder(variable);
        this.calculateStats();
    }

    renderContent() {
        switch(this.state.active) {
            case 'table':
                return <Table setOrder={this.setOrder} getOrderVariable={this.getOrderVariable.bind(this)} champsArray={this.state.champs}/>
            case 'calculator':
                this.setDefaultOrder();
                return <Calculator champsArray={this.state.champs}/>
            default: 
                return ''
        }
    }

	render() {
        return (
            <div>
                {this.renderSwitcher()}
                {this.renderContent()}
            </div>
        );
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