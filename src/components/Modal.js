import React, { Component } from 'react';
import '../styles/Modal.css';
import '../styles/app.css';

export class Modal extends Component {
	render() {
		return (
			<div
				className='Modal border shadow-2xl border-blue-700 rounded-lg  '
				style={{ backgroundColor: '#1a202c' }}>
				{this.props.children}
			</div>
		);
	}
}

export default Modal;
