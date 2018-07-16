import { h, render, Component } from 'preact';
import { createStore } from 'redux'
import appStore from './reducers/store'


import AppMain from './AppMain';
import NavBar from './NavBar';


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
		this.setState({appType : type });
	}
 
	render(props, state) {
		return (
			<div>
				<NavBar updateAppType={ this.updateAppType.bind(this) } />
				<AppMain store={this.store} appType={this.state.appType} />
			</div>
		);
	}
}


export default MainLeagueApp;