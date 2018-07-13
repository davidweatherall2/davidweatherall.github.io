import { h, render, Component } from 'preact';

import AppMain from './AppMain';


//https://wireframe.cc/xKOvCE
class MainLeagueApp extends Component {
    constructor() {
        super();
        // set initial time:
        this.state = {
            appType: 'matchUp'
        };
    }


    appNavBar() {
    	return (
    		<div class="testy0">
    			<button onClick={() => this.setState({appType: 'matchUp'})}>Match Up</button>
    			<button onClick={() => this.setState({appType: 'firstBlood'})}>First Blood</button>
    			<button onClick={() => this.setState({appType: 'firstDragon'})}>First Dragon</button>
    			<button onClick={() => this.setState({appType: 'firstTower'})}>First Tower</button>
    			<button onClick={() => this.setState({appType: 'win'})}>Win</button>
    		</div>
    	);
    }
 
    render(props, state) {
        return (
        	<div>
        		<div>
		        	{ this.appNavBar() }
	        	</div>
	        	<div>
		        	<AppMain appType={this.state.appType}/>
    			</div>
    		</div>
        );
    }
}


export default MainLeagueApp;