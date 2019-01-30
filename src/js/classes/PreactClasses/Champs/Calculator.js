import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading,
    }
})
class Calculator extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return 'calc';
	}
}


export default Calculator;