import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';
import Champs from './Champs/index.js';

class AppMain extends Component {

	getSpecificApp() {
		switch(this.props.appType) {
			case 'matchUp':
				return <MatchUp store={this.props.store}/>;

			case 'champs':
				return <Champs />;
		}
	}

	render() {
		return this.getSpecificApp();
	}
}


export default AppMain;