import { h, render, Component } from 'preact';
import MatchCard from './MatchCard';

class MatchElements extends Component {

	renderCards(team, team2 = false) {
		let cards = [];

		if(team2) {
			Array.from(this.props.games, (game) => {
				if(game.teamNames.includes(team) && game.teamNames.includes(team2)) {
					cards.push(<MatchCard game={game} team={false}/>);
				}
			});
		} else {
			Array.from(this.props.games, (game) => {
				if(game.teamNames.includes(team)) {
					cards.push(<MatchCard game={game} team={team}/>);
				}
			});
		}
		return cards;
	}

	render() {
		return (
			<div className="matches__columns">
				<div className="matches__column">
					{this.renderCards(this.props.team1)}
				</div>
				<div className="matches__column">
					{this.renderCards(this.props.team1, this.props.team2)}
				</div>
				<div className="matches__column">
					{this.renderCards(this.props.team2)}
				</div>
			</div>
		)
	}
}


export default MatchElements;