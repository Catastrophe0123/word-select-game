import React, { Component } from 'react';
import '../styles/WordTable.css';
import '../styles/app.css';

export class WordTable extends Component {
	/** classify the words according to length and display
	 * @returns {JSX.Element} - returns JSX markup
	 */
	classifyLength = () => {
		let elements = {};

		this.props.usedWords.forEach((el, index) => {
			let length = el.length;
			if (elements[length]) {
				elements[length].push(el);
			} else {
				elements[length] = [];
				elements[length].push(el);
			}
		});

		return (
			<div className='grid table-grid'>
				{Object.values(elements).map((el, index) => {
					return (
						<div key={index} className='tracking-wide p-1  '>
							<h2 className='font-medium'>
								{el[0].length} letter words{' '}
							</h2>
							{el.map((word) => {
								return (
									<div
										className=' text-center pb-1 rounded-lg'
										key={index}>
										{word}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	};

	render() {
		return (
			<div className='mt-5 text-lg '>
				<h1 className='text-2xl flex justify-center'>Your Words</h1>
				{this.classifyLength()}
			</div>
		);
	}
}

export default WordTable;
