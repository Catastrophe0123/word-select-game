import React, { Component } from 'react';
import Buttons from './Buttons';

export class Game extends Component {
	/** Jumble a given word
	 * @param  {String} word - input word for scrambling
	 */
	jumbleWord = (word) => {
		word = word.toLowerCase();
		// word is now orange
		word = word.split('');
		this.shuffleArray(word);
		this.setState({ jumbledWord: word }, function () {
			this.setUnderscores();
		});
	};

	// state
	constructor(props) {
		super(props);
		this.state = {
			selectedWord: 'Orange',
			jumbledWord: [],
			validWord: new Set([
				'AGE',
				'NOR',
				'RANGE',
				'GORE',
				'GEAR',
				'RAGE',
				'GONE',
				'NEAR',
				'ERA',
				'OGRE',
				'ORE',
				'RAN',
				'ORANGE',
			]),
			usedWords: new Set(),
			selectedLetters: [],
			error: null,
		};
	}

	/** Select a word 6 letter from the dictionary at the start of the game  */
	selectWord = () => {
		// take the size of the word to choose as a param
		// TODO: Work with api and set state
		// current word is hardcoded to ORANGE
	};

	/** Randomize array in-place using Durstenfeld shuffle algorithm
	 * @param {Array} array
	 */
	shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	/** push the letter to the selectedLetters array in state  */
	setSelectedHandler = (letter) => {
		this.setState((st) => {
			// ['_', '_', '_', '_'];
			let selectedLetters = [...st.selectedLetters];
			let x = selectedLetters.findIndex((el) => el === '_');
			selectedLetters[x] = letter;
			return { ...st, selectedLetters };
		});
	};

	/** Set the underscores in selectedLetters initially */
	setUnderscores = () => {
		let us = '';
		this.state.jumbledWord.forEach((el) => {
			us += '_';
		});
		this.setState({ selectedLetters: us.split(''), error: null });
	};

	/** helper function to remove the last entered letter in selectedLetters */
	backSpace = () => {
		this.setState((st) => {
			let selectedLetters = [...st.selectedLetters];
			let x = selectedLetters.findIndex((el) => el === '_');
			selectedLetters[x - 1] = '_';
			return { ...st, selectedLetters, error: null };
		});
	};

	/** Check if the userWord is a valid word and add score
	 * @param {Function} onClearHandler - function used to clear the input
	 */
	onCheckHandler = (onClearHandler) => {
		let userWord = this.state.selectedLetters.join('').split('_')[0];
		if (userWord.length <= 2) {
			return this.setState({ error: "Two letter words don't count" });
		}

		userWord = userWord.toUpperCase();
		if (
			this.state.validWord.has(userWord) &&
			!this.state.usedWords.has(userWord)
		) {
			// set score
			// set errors to null
			// clear the input
			// add the word to the usedWords array
			this.setState((st) => {
				let len = userWord.length;
				let score = this.props.score;
				if (len === 3) score += 5;
				if (len === 4) score += 10;
				if (len === 5) score += 20;
				if (len >= 6) score += 100;
				let usedWords = new Set(st.usedWords);
				usedWords.add(userWord);
				onClearHandler();
				this.props.setScore(score);
				return { ...st, error: null, usedWords };
			});
		} else if (this.state.usedWords.has(userWord)) {
			this.setState({ error: 'We have been through this before' });
		} else {
			this.setState({ error: 'Thats not english' });
			return;
		}
	};

	componentDidMount = () => {
		this.selectWord();
		// jumble the selected word
		// this.jumbleWord(this.state.selectedWord);
	};

	render() {
		return (
			<div>
				<h1>WELCOME TO WORD SCRAMBLE GAME</h1>
				<h1>SCORE : {this.props.score}</h1>
				<h2>{this.state.jumbledWord.join('')}</h2>
				<h1 style={{ letterSpacing: '5px' }}>
					{' '}
					{this.state.selectedLetters}{' '}
				</h1>

				<Buttons
					setSelectedHandler={this.setSelectedHandler}
					jumbledWord={this.state.jumbledWord}
					jumbleWord={this.jumbleWord}
					selectedWord={this.state.selectedWord}
					backSpace={this.backSpace}
					setUnderscores={this.setUnderscores}
					onCheckHandler={this.onCheckHandler}
				/>

				{this.state.error ? <p>{this.state.error}</p> : null}
			</div>
		);
	}
}

export default Game;
