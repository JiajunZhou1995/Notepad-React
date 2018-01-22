import React, { Component, PropTypes } from 'react';

export default class NewTodo extends Component {
	render() {
		return (
			<li
				className='list-group-item new-todo todo-item note-row-incomplete'
				onClick={this.props.addTodo}
			>
				+ Click here to add a new TODO
			</li>
		)
	}
}
