import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';
import FirstBlood from './FirstBlood/index.js';

class AppMain extends Component {
	constructor() {
		super();

		this.store = createStore(reducer)

		this.state = {
			appType: 'matchUp'
		};
	}

	getSpecificApp() {
		switch(this.props.appType) {
			case 'matchUp':
				return <MatchUp store={this.props.store}/>;

			case 'firstBlood':
				return <FirstBlood store={this.props.store}/>;
		}
	}

	render() {
		return this.getSpecificApp();
	}
}


export default AppMain;