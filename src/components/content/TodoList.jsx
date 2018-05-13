import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

class TodoList extends Component {

	constructor ( props ) {
		super( props );

		this.state = {
			todos   : [],
			checked : []
		}
	}

	handleCheckToggle( value ) {
	}

	sortTasksByCompleted( todos ) {
		return todos.sort(( a, b ) => a.completed === b.completed ? 0 : a ? 1 : -1 );
	}

	render() {
		let tasks = this.sortTasksByCompleted( this.props.todos );

		return (
			<List component="nav" className="task-list">
			{
				tasks.map(( task, index ) => {
					let checked = task.completed || this.state.checked.indexOf( index ) !== -1 ? 'item__text--striped' : '';

					return (
						<Fragment key={index}>
							<ListItem className="item" divider>
								<Checkbox checked={task.completed} color="default" onChange={this.handleCheckToggle.bind( this )}/>
								<ListItemText className={`item__text ${checked}`} primary={task.title} />
								<Button variant="raised" className="item__button item__button--green">Edit<Edit /></Button>
								<Button variant="raised" className="item__button item__button--red">Delete<Delete /></Button>
							</ListItem>
						</Fragment>
					);
				} )
			}
			</List>
		);
	}
}

TodoList.propTypes = {
	todos      : PropTypes.array.isRequired,
	hasErrored : PropTypes.bool.isRequired,
	isLoading  : PropTypes.bool.isRequired
};

const mapStateToProps = ( state ) => {
	return {
		todos      : state.todos,
		hasErrored : state.todosHasErrored,
		isLoading  : state.todosIsLoading
	};
};

export default connect( mapStateToProps )( TodoList );
