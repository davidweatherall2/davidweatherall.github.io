import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import MatchElement from './Matches/MatchElement';

@connect((store) => {
    return {
        loading: store.matches.loading,
        matches: store.matches.matches,
    }
})
class Matches extends Component {
    constructor(props) {
        super(props);
        // set initial time:
        this.state = {
            time: new Date().getTime() / 1000
        };
        this.fetchMatches();
    }

    fetchMatches() {
		this.props.dispatch({
			type: 'GET_MATCHES',
			payload: fetch(`/api/schedule.json`).then(response => response.json())
		});
    }
 
    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({
                time: new Date().getTime() / 1000
            });
        }, 1000);
    }
 
    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    getTimeDifference(time1, time2) {
        if(time1 > time2) {
            let difference = time1 - time2;
            const days = Math.floor(difference / (3600*24));
            const formattedDays = ("0" + days).slice(-2);
            difference  -= days*3600*24;
            const hrs   = Math.floor(difference / 3600);
            const formattedHrs = ("0" + hrs).slice(-2);
            difference  -= hrs*3600;
            const mnts = Math.floor(difference / 60);
            const formattedMnts = ("0" + mnts).slice(-2);
            difference  -= mnts*60;
            const seconds = Math.floor(difference);
            const formattedSeconds = ("0" + seconds).slice(-2);
            return `${formattedDays}:${formattedHrs}:${formattedMnts}:${formattedSeconds}`;
        } else {
            return '00:00:00:00';
        }
    }

    getNextMatches(count = 10) {
        if(this.props.loading) {
            return 'Loading';
        }
        if(this.props.matches) {
            let matchElements = [];
            for (let index = 0; index < count; index++) {
                if(this.props.matches.length > index) {
                    matchElements.push(<MatchElement store={this.props.store} match={this.props.matches[index]} time={this.getTimeDifference(this.props.matches[index].datetime, this.state.time)}/>);
                }
            }
            return matchElements;
        }
        return '';
    }
 
    render(props, state) {
        return <span>{ this.getNextMatches(10) }</span>;
    }
}


export default Matches;