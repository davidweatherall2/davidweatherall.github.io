import { h, render, Component } from 'preact';
import { createStore } from 'redux'
import reducer from './reducers/index'


import AppMain from './AppMain';
import NavBar from './NavBar';


//https://wireframe.cc/xKOvCE
class MainLeagueApp extends Component {
	constructor() {
		super();

		this.store = createStore(reducer)

		this.state = {
			appType: 'matchUp'
		};
	}


	updateAppType(type) {
		this.setState({appType : type });
		this.store.dispatch({
			type: 'UPDATE_REGION',
			text: 'LCK'
		})
		console.log(this.store.getState());
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