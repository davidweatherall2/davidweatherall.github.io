import { h, render, Component } from 'preact';
import LeagueAppController from './PreactClasses/LeagueAppController';

class LeagueReactApp {
	constructor(element) {
		this.element = element;
		this.bindEvents();
	}

	bindEvents() {
		console.log('rendering');
		render(<LeagueAppController />, this.element);
	}
}

export default LeagueReactApp;