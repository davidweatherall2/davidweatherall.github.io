import { h, render, Component } from 'preact';
import appStore from './reducers/store'
import { connect } from 'preact-redux';

import AppMain from './AppMain';
import NavBar from './NavBar';
import Matches from './Matches/index.js';



@connect((store) => {
    return {
        appType: store.config.appType
    }
})
//https://wireframe.cc/xKOvCE
class MainLeagueApp extends Component {
	constructor(props) {
		super(props);

		if(!this.props.appType) {
			this.updateAppType('matchUp');
		}
	}


	updateAppType(type) {
		this.props.dispatch({
			type: 'SET_APP_TYPE',
			appType: type
		})
	}
 
	render(props, state) {
		return (
			<div>
				<header>
					<nav class="nav">
						<div class="nav__logo"><a href="https://github.com/davidweatherall" target="_blank">David Weatherall</a></div>
						<div class="nav__links  js-nav-links">
							<NavBar updateAppType={ this.updateAppType.bind(this) } appType={this.props.appType} />
						</div>
					</nav>
				</header>
				<div class="page">
					<div class="matches">
						<Matches/>
					</div>
					<main class="main">
						<AppMain appType={this.props.appType} />
					</main>
				</div>
			</div>
		);
	}
}


export default MainLeagueApp;