import { h, render, Component } from 'preact';

class NavBar extends Component {

	getLinks() {
		let options = {
			matchUp : 'Match Up',
			champs : 'Champs',
			players: 'Players'
		}
		let links = []

		for (const option in options) {
			links.push(<li onClick={() => this.props.updateAppType(option)} className={this.isActive(option) ? 'is-active' : ''}>{options[option]}</li>);
		}
		return links;
	}

	isActive(option) {
		return option === this.props.appType;
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