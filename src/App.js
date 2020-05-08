import React, { Component } from 'react';
import Game from './components/Game';

export class App extends Component {
	state = { score: 0 };

	/** Set the score state in the app component
	 * @param {Number} score - score to add to the state
	 */
	setScore = (score) => {
		this.setState({ score });
	};

	render() {
		return (
			<div>
				<Game score={this.state.score} setScore={this.setScore} />
			</div>
		);
	}
}

export default App;
