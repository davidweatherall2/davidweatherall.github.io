import { h, render, Component } from 'preact';
import { createStore } from 'redux'
import appStore from './reducers/store'


import AppMain from './AppMain';
import NavBar from './NavBar';
import Matches from './Matches';



//https://wireframe.cc/xKOvCE
class MainLeagueApp extends Component {
	constructor() {
		super();

		this.store = appStore

		this.state = {
			appType: 'matchUp'
		};
	}


	updateAppType(type) {
		console.log(type);
		this.setState({appType : type });
	}
 
	render(props, state) {
		return (
			<div>
				<header>
					<nav class="nav">
						<div class="nav__logo"><a href="https://github.com/davidweatherall" target="_blank">David Weatherall</a></div>
						<div class="nav__links  js-nav-links">
							<NavBar updateAppType={ this.updateAppType.bind(this) } appType={this.state.appType} />
						</div>
					</nav>
				</header>
				<div class="page">
					<div class="matches">
						<Matches />
					</div>
					<main class="main">
						<AppMain store={this.store} appType={this.state.appType} />
					</main>
				</div>
			</div>
		);
	}
}


export default MainLeagueApp;