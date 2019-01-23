import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        activeVariables: store.stats.activeVariables
    }
})
class Variables extends Component {

	constructor(props) {
		super(props);
        if(window.localStorage.variables) {
            this.setLocalVariables();
        } else {
            this.setDefaultVariables();
        }
	}

    setDefaultVariables() {
        this.props.dispatch({
            type: 'SET_ALL_VARIABLES',
            variables: this.props.variables
        });
    }
    
    setLocalVariables() {
        console.log('seting local');
        this.props.dispatch({
            type: 'SET_ALL_VARIABLES',
            variables: JSON.parse(window.localStorage.variables)
        });
    }

    isVariableActive(variable) {
        if(this.props.activeVariables) {
            console.log('checker', this.props.activeVariables.some(activeVariable => activeVariable.statName === variable.statName));
        }
        if(this.props.activeVariables && this.props.activeVariables.some(activeVariable => activeVariable.statName === variable.statName)) {
            return 'checked';
        }
        return '';
    }

    toggleVariable(variable) {
        let activeVariables = Object.assign([], this.props.activeVariables);
        if(this.props.activeVariables.some(activeVariable => activeVariable.statName === variable.statName)) {
            activeVariables = activeVariables.filter(activeVariable => activeVariable.statName !== variable.statName)
        } else {
            activeVariables.push(variable);
        }
        this.props.dispatch({
            type: 'SET_ALL_VARIABLES',
            variables: activeVariables
        })
        console.log('active vars are ', activeVariables);
        window.localStorage.variables = JSON.stringify(activeVariables);
    }

    renderVariables() {
        let variables = [];
        Array.from(this.props.variables, variable => {
            variables.push(
                <div className="topnav__input-holder">
                    <input onChange={() => { this.toggleVariable(variable)}} checked={this.isVariableActive(variable)} id={`variable-${variable.friendlyName}`} type="checkbox" />
                    <label for={`variable-${variable.friendlyName}`}>{variable.friendlyName}</label>
                </div>
            )
        });
        return variables;
    }

	render() {
		return (
            <div>
                {this.renderVariables()}
            </div>
        )
    }
}


export default Variables;