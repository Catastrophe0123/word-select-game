import React, { Component } from 'react';
import '../styles/buttons.css';

export class Buttons extends Component {
	// selectedLetters is a set of indices
	state = {
		letters: {},
		selectedLetters: new Set(),
		usedLetterCounts: {},
		ds: {},
	};

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

				console.log(x);

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
				console.log('i ransjkdn');
				this.props.setSelectedHandler(letter);
			}
		);

		// set the state in game
	};

	/** Letter select handler */
	onLetterClickHandler = (event) => {
		let letter = event.target.value;
		let index = parseInt(event.target.name);
		// we got the letter that was selected
		this.onLetterHelper(letter, index);
		// we have the count in props.letterCounts
	};

	/** Generates button for each letter in the word  */
	generateButtons = () => {
		return this.props.jumbledWord.map((letter, index) => {
			return (
				<div className='flex mb-4'>
					<button
						className='center inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow '
						key={index}
						value={letter}
						name={index}
						onClick={this.onLetterClickHandler}
						disabled={this.state.selectedLetters.has(index)}>
						{letter}
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
				console.log('idx : ', index);
				if (index === null || index === undefined) {
					console.log('qweqweqwe');
					return { ...st };
				}

				let letter = st.letters[index];

				let cpyulc = { ...st.usedLetterCounts };
				cpyulc[letter] = st.usedLetterCounts[letter] - 1;

				console.log(st.ds[letter]);
				let x = [...st.ds[letter]];
				x.push(index.toString());
				console.log('x : ', x);

				let newdata = {};
				for (let j in st.ds) {
					if (j == letter) {
						newdata[letter] = [...x];
					} else {
						newdata[j] = [...st.ds[j]];
					}
				}

				console.log(newdata);

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

		// have to do some stuff
		// update usedLetterCounts

		this.setState(
			(st) => {
				let usedLetterCounts = {};
				for (let i in st.usedLetterCounts) {
					console.log(i);
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

	onKeyboardHandler = (event) => {
		console.log(event.keyCode);

		// backspace
		if (event.keyCode === 8) {
			this.backSpaceHandler();
			return;
		}

		if (event.keyCode === 13) {
			this.props.onCheckHandler(this.onClearHandler);
			return;
		}

		let letter = String.fromCharCode(event.keyCode);
		letter = letter.toLowerCase();
		// we have the letter now
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
				<input
					autoFocus
					onKeyDown={this.onKeyboardHandler}
					value={this.props.selectedLetters.join('')}
				/>
				<div className='flex flex-wrap center'>
					{this.generateButtons()}
				</div>
				<br />
				<br />
				<button
					className='center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
					onClick={this.backSpaceHandler}>
					Backspace
				</button>
				<button
					className='center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
					onClick={this.onClearHandler}>
					Clear
				</button>
				<button
					className='center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
					onClick={this.props.onCheckHandler.bind(
						this,
						this.onClearHandler
					)}>
					Check
				</button>
				<button
					onClick={this.jumbleAgain.bind(this, true)}
					className='center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
					Jumble Again
				</button>
			</div>
		);
	}
}

export default Buttons;
