import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';

class AppMain extends Component {


	getSpecificApp() {
		switch(this.props.appType) {
			case 'matchUp':
				return <MatchUp />;
				break;

			case 'firstBlood':
				return 'FIRST DRAG BOY';
				break;
		}
	}

	render() {
		return this.getSpecificApp();
	}
}


export default AppMain;