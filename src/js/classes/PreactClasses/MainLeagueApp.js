import { h, render, Component } from 'preact';
import { createStore } from 'redux'
import { Provider } from 'preact-redux'
import appStore from './reducers/store'


import AppMain from './AppMain';
import NavBar from './NavBar';
import Matches from './Matches/index.js';



//https://wireframe.cc/xKOvCE
class MainLeagueApp extends Component {
	constructor() {
		super();

		this.store = appStore
		if(window.localStorage.appType) {
			this.state = {
				appType: window.localStorage.appType
			};
		} else {
			this.state = {
				appType: 'matchUp'
			};
		}
	}


	updateAppType(type) {
		this.setState({appType : type });
		window.localStorage.appType = type;
	}
 
	render(props, state) {
		return (
			<Provider store={this.store}>
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
							<Matches/>
						</div>
						<main class="main">
							<AppMain appType={this.state.appType} />
						</main>
					</div>
				</div>
			</Provider>
		);
	}
}


export default MainLeagueApp;