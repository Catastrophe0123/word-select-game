import React, { Component } from 'react';
import Buttons from './Buttons';
import WordTable from './WordTable';
import '../styles/app.css';
import data from './semifinaldict.json';
import '../styles/Game.css';

export class Game extends Component {
	/** Jumble a given word
	 * @param  {String} word - input word for scrambling
	 * @param {Function} func - the callback function to call after setState
	 */
	jumbleWord = (wordStr, func) => {
		wordStr = wordStr.toLowerCase();
		// word is now orange
		let word = wordStr.split('');
		this.shuffleArray(word);

		let letterCounts = {};

		for (let i = 0; i < word.length; i++) {
			// we have the letter
			let count = wordStr.split(wordStr[i]).length - 1;
			letterCounts[wordStr[i]] = count;
		}

		this.setState({ jumbledWord: word, letterCounts }, function () {
			func(this.state.jumbledWord);
			this.setUnderscores();
		});
	};

	// state
	constructor(props) {
		super(props);
		this.state = {
			selectedWord: null,
			jumbledWord: [],
			validWords: new Set(),
			usedWords: new Set(),
			selectedLetters: [],
			error: null,
			letterCounts: {},
		};
	}

	/** generate random number between 0 and max value
	 *  - 0 is inclusive
	 * - max is exclusive
	 * @param {Number} max - upper limit
	 */
	getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	/** Select a word of the given letter count from the given api at the start of the game
	 * @param {Number} wordLength - the required word length
	 */
	selectWord = (wordLength) => {
		let filteredWords = Object.keys(data).filter(
			(word) => word.length === wordLength
		);

		let idx = this.getRandomInt(filteredWords.length);

		let selectedWord = filteredWords[idx];

		let validWords = data[selectedWord];

		this.setState(
			{
				validWords: new Set(validWords),
				selectedWord,
			},
			() => {
				this.props.getData(validWords);
			}
		);
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

	/** push the letter to the selectedLetters array in state
	 * @param {String} letter - the letter to set
	 */
	setSelectedHandler = (letter) => {
		this.setState((st) => {
			let selectedLetters = [...st.selectedLetters];
			let x = selectedLetters.findIndex((el) => el === '_');
			selectedLetters[x] = letter;
			return { ...st, selectedLetters };
		});
	};

	componentDidUpdate = () => {
		if (this.props.seconds <= 1000 && !this.props.usedWords) {
			this.props.setUsedWords(this.state.usedWords);
		}
	};

	/** Set the underscores in selectedLetters initially */
	setUnderscores = () => {
		let us = '';
		this.state.jumbledWord.forEach((el) => {
			us += '_';
		});
		this.setState({ selectedLetters: us.split(''), error: null });
	};

	/** helper function to remove the last entered letter in selectedLetters
	 * @param {Function} callback - callback function to call after setting the state
	 */
	backSpace = (callback) => {
		this.setState(
			(st) => {
				let selectedLetters = [...st.selectedLetters];
				let x = selectedLetters.findIndex((el) => el === '_');
				if (x === -1) {
					let lastIndex = selectedLetters.length - 1;
					selectedLetters[lastIndex] = '_';
				} else {
					selectedLetters[x - 1] = '_';
				}
				return { ...st, selectedLetters, error: null };
			},
			() => {
				callback();
			}
		);
	};

	/** Check if the userWord is a valid word and add score
	 * @param {Function} onClearHandler - function used to clear the input
	 */
	onCheckHandler = (onClearHandler) => {
		let userWord = this.state.selectedLetters.join('').split('_')[0];
		if (userWord.length <= 2) {
			return this.setState({ error: "Two letter words don't count" });
		}
		userWord = userWord.toLowerCase();
		if (
			this.state.validWords.has(userWord) &&
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
				if (len === 6) score += 50;
				if (len === 7) score += 75;
				if (len === 8) score += 100;
				if (len === 9) score += 150;
				if (len === 10) score += 200;
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
		this.selectWord(this.props.wordLength);
	};

	render() {
		return (
			<div>
				<header>
					<h1 className='text-center mb-4 font-sans text-6xl '>
						World of Words
					</h1>
				</header>
				<div>
					<h2 className='text-center font-mono text-2xl tracking-widest jumbled-words '>
						{this.state.jumbledWord.join('').toUpperCase()}
					</h2>

					{this.state.selectedWord ? (
						<div>
							<Buttons
								setSelectedHandler={this.setSelectedHandler}
								jumbledWord={this.state.jumbledWord}
								jumbleWord={this.jumbleWord}
								selectedWord={this.state.selectedWord}
								backSpace={this.backSpace}
								setUnderscores={this.setUnderscores}
								onCheckHandler={this.onCheckHandler}
								selectedLetters={this.state.selectedLetters}
								letterCounts={this.state.letterCounts}
							/>
						</div>
					) : null}

					{this.state.error ? (
						<p className=' m-4 text-lg text-center text-red-500'>
							{this.state.error}
						</p>
					) : null}

					<WordTable usedWords={[...this.state.usedWords]} />
				</div>
			</div>
		);
	}
}

export default Game;
