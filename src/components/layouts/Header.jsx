import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, Badge } from 'material-ui';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import DialogPopup from '../partials/DialogPopup';
import { createTask } from '../../js/actions';

class Header extends Component {

	constructor ( props ) {
		super( props );

		this.state = {
			dialogShow : false,
			dialogType : ''
		}
	}

	createTask( data ) {
		let exist = this.props.todos.some(( task ) => {
			return task.title.toLowerCase() === data.title.toLowerCase();
		} );

		if ( data.save && exist || data.save && data.title === '' ) {
			let descriptionElem = document.querySelector( '#form-dialog-description' );
			descriptionElem.style.color = '#f00';

			let text = 'Task title is require!';

			if ( exist ) text = 'Task already exist try again!';

			descriptionElem.innerHTML = text;
			return;
		}

		if ( data.save && data.title !== '' ) this.props.createTask( data.title );

		this.resetState();
	}

	showDialog( data ) {
		this.setState( {
			dialogType : data.type,
			dialogShow : true
		} )
	}

	resetState() {
		this.setState( {
			dialogShow : false,
			dialogType : ''
		} )
	}

	render() {
		const total =  this.props.todos.length;
		return (
			<AppBar position="static" className="app-bar">
				<Toolbar>
					<Badge color="primary" badgeContent={total}>
						<Typography variant="title" color="inherit" className="toolbar-title">
							Tasks
						</Typography>
					</Badge>
					<Button variant="fab"
						color="primary"
						mini={true}
						aria-label="Add"
						className="plus-button"
						onClick={this.showDialog.bind( this, { type : 'add' } )}>
							<AddIcon />
					</Button>
				</Toolbar>
				{
					this.state.dialogShow ?	<DialogPopup data={this.state} createTask={this.createTask.bind( this )} className="task-popup"/> : null
				}
			</AppBar>
		);
	}
}

Header.propTypes = {
	todos      : PropTypes.array.isRequired,
	createTask : PropTypes.func
};

const mapStateToProps = ( state ) => {
	return {
		todos : state.todos
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		createTask : ( title ) => dispatch( createTask( title ))
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Header );
