import { h, render, Component } from 'preact';
import MatchUp from './MatchUp/index.js';
import FirstBlood from './FirstBlood/index.js';

class NavBar extends Component {

	getLinks() {
		let options = {
			matchUp : 'Match Up',
			firstBlood : 'First Blood',
		}
		let links = []

		for (const option in options) {
			links.push(<li onClick={() => this.props.updateAppType(option)}>{options[option]}</li>);
		}
		return links;
	}

	render() {
		return (
			<ul>
				{this.getLinks() }
			</ul>
		);
	}
}


export default NavBar;