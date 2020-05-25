import React, { Component } from 'react';
import Game from './components/Game';
import Modal from './components/Modal';
import BackDrop from './components/BackDrop';
import Timer from './components/Timer';
import './styles/app.css';

export class App extends Component {
	state = {
		score: 0,
		key: 1,
		seconds: 120000,
		key1: 0,
		showModal: false,
		level: 1,
		wordLength: 6,
		scoreToBeat: 100,
		validWords: new Set(),
		usedWords: null,
	};

	/** Set the score state in the app component
	 * @param {Number} score - score to add to the state
	 */
	setScore = (score) => {
		this.setState({ score });
	};

	/** Rerender the game screen to rerender the timer and move to the next level */
	rerenderGame = () => {
		this.setState((st) => {
			return {
				...st,
				key: (st.key += 1),
				seconds: 120000,
				key1: (st.key1 += 1),
				level: (st.level += 1),
				scoreToBeat: st.scoreToBeat + 50,
				wordLength: (st.wordLength += 1),
				validWords: new Set(),
				usedWords: [],
			};
		});
	};

	/** Function to remove the modal and start a new game */
	onContinueHandler = () => {
		this.setState((st) => {
			return {
				...st,
				key: (st.key += 1),
				score: 0,
				showModal: false,
				seconds: 120000,
				key1: (st.key1 += 1),
				level: 1,
				scoreToBeat: 100,
				wordLength: 6,
				validWords: new Set(),
				usedWords: [],
			};
		});
	};

	/** set the valid words in app
	 * @param {Set} validWords - valid words
	 */
	getData = (validWords) => {
		this.setState({
			validWords,
		});
	};

	setUsedWords = (usedWords) => {
		this.setState({ usedWords });
	};

	/** display the game over modal */
	displayModal = () => {
		const gameoverString = 'GAME OVER';

		if (this.state.showModal) {
			let words = [];
			this.state.validWords.forEach((el) => {
				if (!this.state.usedWords.has(el)) {
					words.push(el);
				}
			});
			words.sort((a, b) => b.length - a.length);

			return (
				<div>
					<Modal>
						<div>
							<h4 className='text-center font-bold text-2xl  '>
								{gameoverString}
							</h4>
							<p>You missed : </p>
							<ul className='list-none text-center '>
								{words.slice(0, 6).map((el, id) => {
									return (
										<li
											className='border border-blue-700 my-2 rounded shadow-sm '
											key={id}>
											{' '}
											{el.toUpperCase()}{' '}
										</li>
									);
								})}
							</ul>
							<div className='flex justify-center'>
								<button
									className=' mt-2 border-2 border-blue-700  p-2 rounded px-6 hover:bg-blue-700 hover:border-white '
									onClick={this.onContinueHandler}>
									Try again
								</button>
							</div>
						</div>
					</Modal>
					<BackDrop onclick={this.onContinueHandler} />
				</div>
			);
		}
	};

	/** Function that checks score and moves to next stage when timer ends */
	onTimerEndHandler = () => {
		// check if the score is > 100
		if (this.state.score >= this.state.scoreToBeat) {
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
		let colour = ' text-red-500 ';
		if (this.state.score >= this.state.scoreToBeat) {
			colour = 'text-green-500';
		}
		return (
			<div className=' text-white'>
				<div className='container mx-auto px-2 mt-4  '>
					<div className='font-mono text-3xl w-full '>
						<div className='flex justify-between flex-wrap '>
							<p>
								{' '}
								score :{' '}
								<span className={colour}>
									{this.state.score}
								</span>
							</p>
							<p>Level : {this.state.level}</p>
							<div>
								<Timer
									key={this.state.key1}
									seconds={this.state.seconds}
									onTimerEndHandler={this.onTimerEndHandler}
									setTimeHandler={this.setTimeHandler}
								/>
							</div>
						</div>
					</div>

					<Game
						level={this.state.level}
						wordLength={this.state.wordLength}
						key={this.state.key}
						rerenderGame={this.rerenderGame}
						score={this.state.score}
						setScore={this.setScore}
						onContinueHandler={this.onContinueHandler}
						scoreToBeat={this.state.scoreToBeat}
						getData={this.getData}
						seconds={this.state.seconds}
						setUsedWords={this.setUsedWords}
						usedWords={this.state.usedWords}
					/>

					{this.displayModal()}
				</div>
			</div>
		);
	}
}

export default App;
