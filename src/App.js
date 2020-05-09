import React, { Component } from 'react';
import Game from './components/Game';
import Modal from './components/Modal';
import BackDrop from './components/BackDrop';
import Timer from './components/Timer';
import Particles from 'react-particles-js';
import "./App.css";

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

export class App extends Component {
	state = { score: 0, key: 1, seconds: 120000, key1: 0, showModal: false };

	/** Set the score state in the app component
	 * @param {Number} score - score to add to the state
	 */
	setScore = (score) => {
		this.setState({ score });
	};

	/** Rerender the game screen to rerender the timer and move to the next level */
	rerenderGame = () => {
		this.setState((st) => {
			return { ...st, key: st.key++, seconds: 120000, key1: st.key1++ };
		});
	};

	/** Function to remove the modal and start a new game */
	onContinueHandler = () => {
		this.setState((st) => {
			return {
				...st,
				key: st.key++,
				score: 0,
				showModal: false,
				seconds: 120000,
				key1: st.key1++,
			};
		});
	};

	/** display the game over modal */
	displayModal = () => {
		const gameoverString = 'GAME OVER';
		if (this.state.showModal) {
			return (
				<div>
					<Modal className="">
						<h4>{gameoverString}</h4>
						<button onClick={this.onContinueHandler}>
							Continue
						</button>
					</Modal>
					<BackDrop onclick={this.onContinueHandler} />
				</div>
			);
		}
	};

	/** Function that checks score and moves to next stage when timer ends */
	onTimerEndHandler = () => {
		// check if the score is > 100
		if (this.state.score >= 100) {
			// keep current score and move on to next level
			this.rerenderGame();
		} else {
			// show new game screen
			this.setState({ showModal: true });
		}
	};

	/** maintain the time in local state.
	 *  Called on each tick */
	setTimeHandler = (data) => {
		// data.seconds
		this.setState((st) => {
			return {
				seconds: data.total,
			};
		});
    };
    
        

	render() {
		return (
			<div>
                <div className="text-right">
                    Timer:<Timer className="cover-right"
					key={this.state.key1}
					seconds={this.state.seconds}
					onTimerEndHandler={this.onTimerEndHandler}
					setTimeHandler={this.setTimeHandler}
				/>
                </div>
				<Game
					key={this.state.key}
					rerenderGame={this.rerenderGame}
					score={this.state.score}
					setScore={this.setScore}
					onContinueHandler={this.onContinueHandler}
				/>
                <Particles className="particles" 
                params={{particlesOptions}
                } />
				{this.displayModal()}
			</div>
		);
	}
}

export default App;
