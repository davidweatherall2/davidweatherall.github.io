import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        team1: store.config.team1,
        team2: store.config.team2,
    }
})

class MatchElement extends Component {
    constructor(props) {
        super(props);
    }

    handleCardClick() {
        this.props.dispatch({
            type: 'UPDATE_TEAMS',
            team1: this.props.match.team1acro,
            team2: this.props.match.team2acro,
            region: 'LCK'
        })
    }
 
    render() {
        return (
            <div className="match-card" onClick={this.handleCardClick.bind(this)}>
                <div className="match-card__league">{this.state.region}</div>
                <div className="match-card__teams">
                    <p>{this.props.match.team1acro}</p>
                    <p>vs</p>
                    <p>{this.props.match.team2acro}</p>
                </div>
                <div className="match-card__time">
                    {this.props.time}
                </div>
            
            </div>
        );
    }
}


export default MatchElement;