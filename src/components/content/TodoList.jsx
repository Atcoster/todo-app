import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { toggleTodoStatus, deleteTask, updateTask } from '../../js/actions';
import DialogPopup from '../partials/DialogPopup';
import Divider from 'material-ui/Divider';

class TodoList extends Component {

	constructor ( props ) {
		super( props );

		this.state = {
			dialogShow : false,
			dialogType : '',
			taskID     : '',
			taskTitle  : ''
		}
	}

	handleCheckToggle( event ) {
		this.props.toggleTodoStatus( event.target );
	}

	sortTasksByCompleted( todos ) {
		return todos.sort(( a, b ) => a.completed - b.completed );
	}

	deleteTask( del ) {
		if ( del ) this.props.deleteTodo( this.state.taskID );

		this.resetState();
	}

	updateTask( data ) {
		let exist = this.props.todos.some(( task ) => {
			return task.title.toLowerCase() === data.title.toLowerCase();
		} );

		if ( data.action && exist || data.action && data.title === '' ) {
			let descriptionElem = document.querySelector( '#form-dialog-description' );
			descriptionElem.style.color = '#f00';

			let text = 'Task title is require!';

			if ( exist ) text = 'Another task with this title already exist try again!';

			descriptionElem.innerHTML = text;
			return;
		}

		if ( data.save && data.title !== '' ) this.props.updateTask( { title : data.title, id : this.state.taskID } );

		this.resetState();
	}

	showDialog( data ) {
		this.setState( {
			dialogType : data.type,
			dialogShow : true,
			taskID     : data.id,
			taskTitle  : data.text !== '' ? data.text : this.state.taskTitle
		} )
	}

	resetState() {
		this.setState( {
			dialogShow : false,
			dialogType : '',
			taskID     : '',
			taskTitle  : ''
		} )
	}

	render() {
		let tasks = this.sortTasksByCompleted( this.props.todos );
		let showDialogPopup = this.state.dialogShow;

		return (
			<Fragment>
				<List component="nav" className="task-list">
					{
						!tasks.length ?
							<ListItem className="item" divider>
								<ListItemText className='item__text' primary='Task list is empty add your first task' />
							</ListItem> : null
					}
					{
						tasks.map(( task, index ) => {
							let checked = task.completed ? 'item__text--striped' : '';

							return (
								<ListItem key={index} className="item" divider>
									<Checkbox id={task._id} checked={task.completed} color="default" onChange={this.handleCheckToggle.bind( this )}/>
									<ListItemText className={`item__text ${checked}`} primary={task.title} />
									<Divider inset />
									<Button
										variant="raised"
										disabled={task.completed}
										className={`item__button ${!task.completed ? 'button--green' : ''}`}
										onClick={this.showDialog.bind( this, { id : task._id, type : 'update', text : task.title } )}>
											Edit <Edit />
									</Button>
									<Button variant="raised"
										className="item__button button--red"
										onClick={this.showDialog.bind( this, { id : task._id, type : 'delete' } )}>
											Delete <Delete />
									</Button>
								</ListItem>
							);
						} )
					}
				</List>
				{
					showDialogPopup ?
						<DialogPopup
							data={this.state}
							deleteTask={this.deleteTask.bind( this )}
							updateTask={this.updateTask.bind( this )}/> : null
				}
			</Fragment>
		);
	}
}

TodoList.propTypes = {
	todos            : PropTypes.array.isRequired,
	toggleTodoStatus : PropTypes.func,
	deleteTodo       : PropTypes.func,
	updateTask       : PropTypes.func
};

const mapStateToProps = ( state ) => {
	return {
		todos : state.todos
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		toggleTodoStatus : ( id ) => dispatch( toggleTodoStatus( id )),
		deleteTodo       : ( id ) => dispatch( deleteTask( id )),
		updateTask       : ( task ) => dispatch( updateTask( task ))
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( TodoList );
