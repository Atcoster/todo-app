import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

class DialogPopup extends Component {

	constructor ( props ) {
		super( props );

		this.state = {
			title : ''
		}
	}

	handleConfirmClose( data ) {
		this.props.deleteTask( data.delete );
	}

	handleFormDialogClose( data ) {
		this.props.createTask( { save : data.action, title : this.state.title } );
	}

	confirmDialog() {
		return (
			<Dialog
				open={true}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
					<DialogTitle>
						{'Delete confirmation?'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this task?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="raised"
										onClick={this.handleConfirmClose.bind( this, { delete : false } )}
										color="primary" className="button--red">
							Cancel
						</Button>
						<Button variant="raised"
										onClick={this.handleConfirmClose.bind( this, { delete : true } )}
										color="primary" className="button--green">
							Delete
						</Button>
					</DialogActions>
			</Dialog>
		);
	}

	formAddDialog() {
		return (
			<Dialog
			open={true}
			aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add new task</DialogTitle>
			<DialogContent>
				<DialogContentText id="form-dialog-description">
					Enter your task and press the save button!
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="task-title"
					label="Task title"
					type="text"
					onChange={this.setTaskTitle.bind( this )}
					fullWidth/>
			</DialogContent>
			<DialogActions>
				<Button onClick={this.handleFormDialogClose.bind( this, { action : false, value : this.state.title } )}>
					Cancel
				</Button>
				<Button onClick={this.handleFormDialogClose.bind( this, { action : true, value : this.state.title } )}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
		);
	}

	formEditDialog() {
		return (
			<Dialog
			open={true}
			aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit task</DialogTitle>
			<DialogContent>
				<DialogContentText id="form-dialog-description">
					Edit your task and press the save button!
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="task-title"
					label="Task title"
					type="text"
					value={this.props.data.taskTitle}
					onChange={this.setTaskTitle.bind( this )}
					fullWidth/>
			</DialogContent>
			<DialogActions>
				<Button onClick={this.handleFormDialogClose.bind( this, { action : false, value : this.state.title } )}>
					Cancel
				</Button>
				<Button onClick={this.handleFormDialogClose.bind( this, { action : true, value : this.state.title } )}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
		);
	}

	setTaskTitle( e ) {
		this.setState( {
			title : e.target.value
		} )
	}
	
	render() {
		console.log( this.props.data );
		if ( this.props.data.dialogType === 'delete' )
			return this.confirmDialog();

		if ( this.props.data.dialogType === 'add' )
			return this.formAddDialog();

		if ( this.props.data.dialogType === 'edit' )
			return this.formEditDialog();

		return null;
	}
}

DialogPopup.propTypes = {
	data       : PropTypes.object.isRequired,
	deleteTask : PropTypes.func,
	createTask : PropTypes.func,
	updateTask : PropTypes.func
};

export default DialogPopup;
