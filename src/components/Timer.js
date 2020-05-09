import React, { Component } from 'react';
import Countdown from 'react-countdown';

export class Timer extends Component {
	render() {
		return (
			<div>
				<Countdown
					autoStart={true}
					onTick={this.props.setTimeHandler}
					date={Date.now() + this.props.seconds}
					onComplete={this.props.onTimerEndHandler}
					renderer={({ hours, minutes, seconds, completed }) => {
						return (
							<span>
								0{minutes} : {seconds}
							</span>
						);
					}}
				/>
			</div>
		);
	}
}

export default Timer;
