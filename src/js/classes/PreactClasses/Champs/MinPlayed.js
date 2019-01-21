import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

@connect((store) => {
    return {
        minPlayed: store.stats.minPlayed
    }
})
class Patches extends Component {

	constructor(props) {
        super(props);
    }

    handleChange(e) {
        this.props.dispatch({
            type: 'SET_MINPLAYED',
            minPlayed: e.target.value,
        })
    }
    
	render() {
		return (
            <div>
                <input value={this.props.minPlayed} onChange={this.handleChange.bind(this)} type="text" placeholder="Min Games Played" />
            </div>
        )
    }
}


export default Patches;