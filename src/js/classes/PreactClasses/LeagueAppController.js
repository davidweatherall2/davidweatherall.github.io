import { h, render, Component } from 'preact';
import { createStore } from 'redux'
import { Provider } from 'preact-redux'
import appStore from './reducers/store'


import MainLeagueApp from './MainLeagueApp';



//https://wireframe.cc/xKOvCE
class LeagueAppController extends Component {
	constructor() {
		super();
		this.store = appStore
	}
 
	render(props, state) {
		return (
			<Provider store={this.store}>
				<MainLeagueApp />
			</Provider>
		);
	}
}


export default LeagueAppController;