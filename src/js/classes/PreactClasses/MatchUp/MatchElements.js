import { h, render, Component } from 'preact';

class MatchElements extends Component {

	render() {
		console.log(this.props);
		return (
			<div>
				Team 1 is {this.props.team1} and team 2 is {this.props.team2}
			</div>
		)
	}
}


export default MatchElements;