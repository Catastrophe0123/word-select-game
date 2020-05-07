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
			]),
			selectedLetters: [],
		};
	}

	/** This is a description of the foo function.
	 * generate words
	 * @param {String} word - input word for splitting
	 */
	findLetters = (word) => {};

	/** Select a word 6 letter from the dictionary at the start of the game  */
	selectWord = () => {
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
		console.log(letter);
		this.setState((st) => {
			// ['_', '_', '_', '_'];
			let selectedLetters = [...st.selectedLetters];
			console.log('i ran');
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
		this.setState({ selectedLetters: us.split('') });
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
				/>
			</div>
		);
	}
}

export default Game;
