import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';
import FirstBlood from './FirstBlood/index.js';

class NavBar extends Component {

	render() {
		return (
			<div>
				<button onClick={() => this.props.updateAppType('matchUp')}>Match Up</button>
				<button onClick={() => this.props.updateAppType('firstBlood')}>First Blood</button>
				<button onClick={() => this.props.updateAppType('firstDragon')}>First Dragon</button>
				<button onClick={() => this.props.updateAppType('firstTower')}>First Tower</button>
				<button onClick={() => this.props.updateAppType('win')}>Win</button>
			</div>
		);
	}
}


export default NavBar;