import React, { Component } from 'react';

import '../styles/BackDrop.css';

export class BackDrop extends Component {
	render() {
		return <div onClick={this.props.onclick} className='BackDrop'></div>;
	}
}

export default BackDrop;
