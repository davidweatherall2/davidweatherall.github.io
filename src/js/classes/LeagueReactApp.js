import { h, render, Component } from 'preact';
import MainLeagueApp from './PreactClasses/MainLeagueApp';

class LeagueReactApp {
	constructor(element) {
		this.element = element;
		this.bindEvents();
	}

	bindEvents() {
		render(<MainLeagueApp />, this.element);
	}
}

export default LeagueReactApp;