import React, { Component } from 'react';
import '../styles/buttons.css';
import '../styles/app.css';

export class Buttons extends Component {
	state = {
		letters: {},
		selectedLetters: new Set(),
		usedLetterCounts: {},
		ds: {},
	};

	/** helper function to update state
	 * @param {String} letter - current letter
	 * @param {Number} index - index of the letter in the jumbled word
	 */
	onLetterHelper = (letter, index) => {
		this.setState(
			(st) => {
				let usedLetterCounts = { ...st.usedLetterCounts };
				usedLetterCounts[letter] = st.usedLetterCounts[letter] + 1;

				let selectedLetters = new Set(st.selectedLetters);
				selectedLetters.add(index);

				let x = [...st.ds[letter]];

				const i = x.indexOf(toString(index));

				x.splice(i, 1);

				let newdata = {};
				for (let j in st.ds) {
					if (j == letter) {
						newdata[letter] = [...x];
					} else {
						newdata[j] = [...st.ds[j]];
					}
				}

				return {
					...st,
					selectedLetters,
					usedLetterCounts,
					ds: newdata,
				};
			},
			() => {
				this.props.setSelectedHandler(letter);
			}
		);
	};

	/** Letter select handler */
	onLetterClickHandler = (event) => {
		let letter = event.target.value;
		let index = parseInt(event.target.name);
		this.onLetterHelper(letter, index);
	};

	/** Generates button for each letter in the word  */
	generateButtons = () => {
		return this.props.jumbledWord.map((letter, index) => {
			let classes =
				' border-2 border-blue-700 w-16  m-2  p-4 rounded hover:bg-blue-700 hover:border-black ';
			if (this.state.selectedLetters.has(index)) {
				classes += '  bg-gray-500 text-gray-300';
			}
			return (
				<div key={index}>
					<button
						className={classes}
						key={index}
						value={letter}
						name={index}
						onClick={this.onLetterClickHandler}
						disabled={this.state.selectedLetters.has(index)}>
						{letter.toUpperCase()}
					</button>
				</div>
			);
		});
	};

	/** function to remove the last entered letter
	 *
	 * 2 functions:
	 * - remove the last letter and replace with _
	 * - enable the letter back - remove from selectedLetters
	 */
	backSpaceHandler = () => {
		this.props.backSpace(() => {
			this.setState((st) => {
				let selectedLetters = [...st.selectedLetters];
				let index = selectedLetters.pop();
				if (index === null || index === undefined) {
					return { ...st };
				}

				let letter = st.letters[index];

				let cpyulc = { ...st.usedLetterCounts };
				cpyulc[letter] = st.usedLetterCounts[letter] - 1;

				let x = [...st.ds[letter]];
				x.push(index.toString());

				let newdata = {};
				for (let j in st.ds) {
					if (j == letter) {
						newdata[letter] = [...x];
					} else {
						newdata[j] = [...st.ds[j]];
					}
				}

				selectedLetters = new Set(selectedLetters);

				return {
					...st,
					selectedLetters,
					ds: newdata,
					usedLetterCounts: cpyulc,
				};
			});
		});
	};

	/** function to clear the user's input */
	onClearHandler = () => {
		this.setState({ selectedLetters: new Set() });
		this.props.setUnderscores();

		this.setState(
			(st) => {
				let usedLetterCounts = {};
				for (let i in st.usedLetterCounts) {
					usedLetterCounts[i] = 0;
				}
				return {
					usedLetterCounts,
				};
			},
			() => {
				this.setDs();
			}
		);
	};

	/** sets the ds state at the start of the game */
	setDs = () => {
		let ds = {};
		for (let i in this.state.letters) {
			let letter = this.state.letters[i];
			try {
				ds[letter].push(i);
			} catch (err) {
				ds[letter] = [];
				ds[letter].push(i);
			}
		}
		this.setState({ ds: ds });
	};

	/** jumble the selected word
	 * @param {Boolean} clear - clear the input or not
	 */
	jumbleAgain = (clear = false) => {
		this.props.jumbleWord(this.props.selectedWord, (jumbledWord) => {
			let letters = {};
			jumbledWord.forEach((letter, index) => {
				letters[index] = letter;
			});

			if (clear) this.onClearHandler();

			this.setState({ letters }, () => {
				this.setDs();
			});
		});
	};

	onKeyPressHelper = (letter) => {
		console.log('i ran keypresshelper');
		if (Object.keys(this.state.usedLetterCounts).includes(letter)) {
			let count = this.state.usedLetterCounts[letter];

			if (count < this.props.letterCounts[letter]) {
				this.setState((st) => {
					let letterarray = [...st.ds[letter]];
					let index = parseInt(letterarray.pop());

					this.onLetterHelper(letter, index);

					return {
						...st,
					};
				});
			}
		}
	};

	/** Handles the onKeyDown event */
	onKeyboardHandler = (event) => {
		// backspace
		console.log('i ran onkyedow');
		if (event.keyCode === 8) {
			this.backSpaceHandler();
			return;
		}

		if (event.keyCode === 13) {
			this.props.onCheckHandler(this.onClearHandler);
			return;
		}
		// let letter = String.fromCharCode(event.keyCode);
		// letter = letter.toLowerCase();
		// if (Object.keys(this.state.usedLetterCounts).includes(letter)) {
		// 	let count = this.state.usedLetterCounts[letter];

		// 	if (count < this.props.letterCounts[letter]) {
		// 		this.setState((st) => {
		// 			let letterarray = [...st.ds[letter]];
		// 			let index = parseInt(letterarray.pop());

		// 			this.onLetterHelper(letter, index);

		// 			return {
		// 				...st,
		// 			};
		// 		});
		// 	}
		// }
	};

	onChangeHandler = (event) => {
		let str = event.target.value;
		// we have the str
		console.log('i ran onCHange');
		let letter = str[str.length - 1];
		console.log(letter);
		if (letter !== '_') {
			this.onKeyPressHelper(letter);
		}
	};

	componentDidMount = () => {
		this.jumbleAgain();
		this.setDs();
	};

	render() {
		if (Object.keys(this.state.letters).length === 0) {
			let x = {};
			Object.keys(this.props.letterCounts).forEach((letter) => {
				x[letter] = 0;
			});

			let letters = {};
			this.props.jumbledWord.forEach((letter, index) => {
				letters[index] = letter;
			});
			this.setState({ letters, usedLetterCounts: x }, () => {
				this.setDs();
			});
		}
		return (
			<div>
				<div className='flex justify-center p-6  '>
					<input
						spellCheck={false}
						className=' sm:text-4xl  jumbled-words text-lg  '
						autoFocus
						onChange={this.onChangeHandler}
						onKeyDown={this.onKeyboardHandler}
						value={this.props.selectedLetters
							.join('')
							.toUpperCase()}
					/>
				</div>
				<div className='flex  justify-center px-16 pt-5 flex-wrap '>
					{this.generateButtons()}
				</div>
				<br />
				<br />
				<div className='grid button-grid gap-4 '>
					<button
						className='   border-2 border-blue-700  p-4 rounded px-6 hover:bg-blue-700 hover:border-black '
						onClick={this.backSpaceHandler}>
						Backspace
					</button>
					<button
						className=' border-2 border-blue-700  p-4 rounded px-6 hover:bg-blue-700 hover:border-black '
						onClick={this.onClearHandler}>
						Clear
					</button>
					<button
						className=' border-2 border-blue-700  p-4 rounded px-6 hover:bg-blue-700 hover:border-black '
						onClick={this.props.onCheckHandler.bind(
							this,
							this.onClearHandler
						)}>
						Check
					</button>
					<button
						className=' border-2 border-blue-700  p-4 rounded px-6 hover:bg-blue-700 hover:border-black '
						onClick={this.jumbleAgain.bind(this, true)}>
						{' '}
						Jumble Again
					</button>
				</div>
			</div>
		);
	}
}

export default Buttons;
