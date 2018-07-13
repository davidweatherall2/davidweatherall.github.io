import { h, render, Component } from 'preact';
import Matches from './PreactClasses/Matches';

class LeagueMatchesApp {
	constructor(element) {
		this.element = element;
		this.bindEvents();
	}

	bindEvents() {
		render(<Matches />, this.element);
	}
}

export default LeagueMatchesApp;