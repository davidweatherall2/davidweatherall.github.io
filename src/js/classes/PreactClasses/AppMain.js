import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';
import Champs from './Champs/index.js';
import Players from './Players/index.js';

class AppMain extends Component {

	getSpecificApp() {
		switch(this.props.appType) {
			case 'matchUp':
				return <MatchUp store={this.props.store}/>;

			case 'champs':
				return <Champs />;

			case 'players':
				return <Players />
		}
	}

	render() {
		return this.getSpecificApp();
	}
}


export default AppMain;