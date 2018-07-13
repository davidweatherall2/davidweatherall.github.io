import LeagueReactApp from './classes/LeagueReactApp';
import LeagueMatchesApp from './classes/LeagueMatchesApp';



const leagueApp = document.querySelector('.js-league-app');
if(leagueApp) {
	new LeagueReactApp(leagueApp);
}

const leagueMatches = document.querySelector('.js-league-matches');
if(leagueMatches) {
	new LeagueMatchesApp(leagueMatches);
}