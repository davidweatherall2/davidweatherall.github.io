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
            region: this.props.match.region
        })
    }
 
    render() {
        return (
            <div className="match-card" onClick={this.handleCardClick.bind(this)}>
                <div className="match-card__backgrounds">
                    <div className="match-card__background" style={`background-image: url('/assets/img/logos/${this.props.match.region}/${this.props.match.team1acro}.png')`}></div>
                    <div className="match-card__background" style={`background-image: url('/assets/img/logos/${this.props.match.region}/${this.props.match.team2acro}.png')`}></div>
                </div>
                <div className="match-card__content">
                    <div className="match-card__league">{this.props.match.region}</div>
                    <div className="match-card__time">
                        {this.props.time}
                    </div>
                </div>    
            </div>
        );
    }
}


export default MatchElement;