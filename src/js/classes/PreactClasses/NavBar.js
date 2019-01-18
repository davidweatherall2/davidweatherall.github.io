import { h, render, Component } from 'preact';

class NavBar extends Component {

	getLinks() {
		let options = {
			matchUp : 'Match Up',
			champs : 'Champs',
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