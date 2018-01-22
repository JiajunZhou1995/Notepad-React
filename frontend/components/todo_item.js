import React, { Component } from 'react';

export default class TodoItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.todo.text
		};

		this.onInputChange = this.onInputChange.bind(this);
	}
	
	render() {
		return (
			<li className={'list-group-item todo-item ' + (this.props.todo.complete ? 'note-row-complete' : 'note-row-incomplete')}>
				<div>
					<label
						className={this.props.todo.complete ? 'complete-btn-complete' : 'complete-btn-incomplete'}>
						<input
							type='checkbox'
							checked={this.props.todo.complete}
							onChange={() => this.props.updateTodo(this.props.todo, 'checkbox')}/>
					</label>
				</div>
				<div>
					<input
						type='text'
						className={this.props.todo.complete ? 'textbox-complete' : 'textbox-incomplete'}
						onChange={this.onInputChange}
						value={this.state.text}>
					</input>
				</div>
				<div>
					<button 
						className={this.props.todo.complete ? 'delete-btn-complete' : 'delete-btn-incomplete'}
						onClick={() => this.props.deleteTodo(this.props.todo.id)}>🗑
					</button>
				</div>
			</li>
		)
	}

	onInputChange(event) {
		this.setState({
			text: event.target.value
		});

		var updatedTodo = {
			id: this.props.todo.id,
			text: event.target.value,
			complete: this.props.todo.complete
		}
		this.props.updateTodo(updatedTodo, 'text')
	}
}
