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
				<button
					key={index}
					value={letter}
					name={index}
					onClick={this.onLetterClickHandler}
					disabled={this.state.selectedLetters.has(index)}>
					{letter}
				</button>
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
				{this.generateButtons()}
				<br />
				<button onClick={this.backSpaceHandler}>Backspace</button>
			</div>
		);
	}
}

export default Buttons;
