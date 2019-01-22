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
        this.setDefaultVariables();
	}

    setDefaultVariables() {
        this.props.dispatch({
            type: 'SET_ALL_VARIABLES',
            variables: this.props.variables
        });
    }

    isVariableActive(variable) {
        if(this.props.activeVariables && this.props.activeVariables.includes(variable)) {
            return 'checked';
        }
        return '';
    }

    toggleVariable(variable) {
        let activeVariables = Object.assign([], this.props.activeVariables);
        if(this.props.activeVariables.includes(variable)) {
            activeVariables = activeVariables.filter(activeVariable => activeVariable !== variable)
        } else {
            activeVariables.push(variable);
        }
        this.props.dispatch({
            type: 'SET_ALL_VARIABLES',
            variables: activeVariables
        })
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