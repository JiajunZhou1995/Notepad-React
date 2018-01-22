import React, { Component } from 'react';
import TodoList from '../containers/todo_list'

export default class Main extends Component {
	render() {
		return (
			<div>
				<h1>My Notepad</h1>
				<TodoList />
			</div>
		)
	}
}
