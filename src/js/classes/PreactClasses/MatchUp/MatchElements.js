import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import MatchCard from './MatchCard';

@connect((store) => {
    return {
        activeRegion: store.config.activeRegion,
        regionData: store.regions.regionData,
        team1: store.config.team1,
        team2: store.config.team2,
    }
})
class MatchElements extends Component {

	renderCards(team, team2 = false) {
		let cards = [];

		if(team2) {
			Array.from(this.props.games, (game) => {
				if(game.teamNames.includes(team) && game.teamNames.includes(team2)) {
					cards.push(<MatchCard game={game} team={false} store={this.props.store}/>);
				}
			});
		} else {
			Array.from(this.props.games, (game) => {
				if(game.teamNames.includes(team)) {
					cards.push(<MatchCard game={game} team={team} store={this.props.store}/>);
				}
			});
		}
		return cards;
	}

	render() {
		return (
			<div className="matches__columns">
				<div className="matches__column">
					<h2>{this.props.team1}'s Recent Matches</h2>
					{this.renderCards(this.props.team1)}
				</div>
				<div className="matches__column">
					<h2>Head to Head</h2>
					{this.renderCards(this.props.team1, this.props.team2)}
				</div>
				<div className="matches__column">

					<h2>{this.props.team2}'s Recent Matches</h2>
					{this.renderCards(this.props.team2)}
				</div>
			</div>
		)
	}
}


export default MatchElements;