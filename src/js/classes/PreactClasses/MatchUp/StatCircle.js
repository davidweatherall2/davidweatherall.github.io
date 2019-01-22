// Credit: https://codepen.io/smlsvnssn/pen/FolaA

import { h, render, Component } from 'preact';


class StatCircle extends Component {

	constructor(props) {
		super(props);
		this.setState({
			circleText: this.props.fbText
		})
	}

	createSvgArc(startPerc, extraPerc) {

		if(!Number.isInteger(startPerc)) {
			startPerc = 0;
		}
		if(!Number.isInteger(extraPerc)) {
			extraPerc = 0;
		}

		const x = 0;
		const y = 0;
		const r = 300;

		let startAngle = ((startPerc / 100) * Math.PI)

		let endAngle = (((extraPerc + startPerc) / 100) * Math.PI)
		

		if (startAngle > endAngle) {
			var s = startAngle;
			startAngle = endAngle;
			endAngle = s;
		}
		if (endAngle - startAngle > Math.PI * 2) {
			endAngle = Math.PI * 1.99999;
		}

		var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
		console.log('nums: ');
		console.log(startPerc);
		console.log(extraPerc);
		console.log(endAngle);
		console.log(startAngle);
		return [
			"M",
			x,
			y,
			"L",
			x + Math.cos(startAngle) * r,
			y - Math.sin(startAngle) * r,
			"A",
			r,
			r,
			0,
			largeArc,
			0,
			x + Math.cos(endAngle) * r,
			y - Math.sin(endAngle) * r,
			"L",
			x,
			y
		].join(" ");
	}

	updateCircle(perc) {
		const text = `${perc.toString()}%`;
		this.setState({
			circleText: text
		})
	}

	resetCircle() {
		this.setState({
			circleText: this.props.fbText
		})
	}

	render() {
		
		return (
			<div className="circle">
				<svg id="theMap" width="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
					<circle cx="300" cy="300" r="300" fill="rgba(255, 255, 255, 0)"/>
					<g id="arcs" transform=" translate(300 300) rotate(-90) scale(1 -1)">
						<path onMouseEnter={() => { this.updateCircle(this.props.red) }} onMouseLeave={this.resetCircle.bind(this)} d={this.createSvgArc(0, this.props.red)} fill="#ff0000" opacity="0.5"></path>
						<path onMouseEnter={() => { this.updateCircle(this.props.blue) }} onMouseLeave={this.resetCircle.bind(this)} d={this.createSvgArc(this.props.red, this.props.blue)} fill="#0023ff" opacity="0.5"></path>
					</g>
					<circle cx="300" cy="300" r="100" fill="#fff"/>
					<text x="50%" y="50%" text-anchor="middle" stroke="#000" stroke-width="2px" dy=".3em" style="font-size: 55px;">{this.state.circleText}</text>
				</svg>
			</div>
		);
	}

	componentWillReceiveProps(newProps) {
		if(newProps.fbText !== this.props.fbText) {
			this.setState({
				circleText: newProps.fbText
			})
		}
	}
}

export default StatCircle; 