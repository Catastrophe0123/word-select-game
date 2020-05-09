import React, { Component } from 'react';

export class Buttons extends Component {
	// selectedLetters is a set of indices
	state = { letters: {}, selectedLetters: new Set() };

	/** Letter select handler */
	onLetterClickHandler = (event) => {
		let letter = event.target.value;
		let index = parseInt(event.target.name);
		// we got the letter that was selected

		this.setState((st) => ({
			selectedLetters: st.selectedLetters.add(index),
		}));

		// set the state in game
		this.props.setSelectedHandler(letter);
	};

	componentDidMount = () => {
		this.props.jumbleWord(this.props.selectedWord);
		let letters = {};
		this.props.jumbledWord.forEach((letter, index) => {
			letters[index] = letter;
		});
		this.setState({ letters });
	};

	/** Generates button for each letter in the word  */
	generateButtons = () => {
		return this.props.jumbledWord.map((letter, index) => {
			return (
                <div className="flex mb-4">
				<button className="center inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
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
		this.props.backSpace();
		this.setState((st) => {
			let selectedLetters = [...st.selectedLetters];
			selectedLetters.pop();
			selectedLetters = new Set(selectedLetters);
			return { ...st, selectedLetters };
		});
	};

	/** function to clear the user's input */
	onClearHandler = () => {
		this.setState({ selectedLetters: new Set() });
		this.props.setUnderscores();
	};

	render() {
		if (Object.keys(this.state.letters).length === 0) {
			let letters = {};
			this.props.jumbledWord.forEach((letter, index) => {
				letters[index] = letter;
			});
			this.setState({ letters });
		}
		return (
            <div>
			<div className="flex flex-wrap center">
				{this.generateButtons()}
            </div>
                <br />
                <br />
				<button className="center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={this.backSpaceHandler}>Backspace</button>
				<button className="center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={this.onClearHandler}>Clear</button>
				<button
                    className="center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
					onClick={this.props.onCheckHandler.bind(
						this,
						this.onClearHandler
					)}>
					Check
				</button>
			</div>
		);
	}
}

export default Buttons;
