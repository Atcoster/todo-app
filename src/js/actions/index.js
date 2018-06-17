import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const success = ( data ) => {
	return {
		type  : 'SUCCESS',
		todos : data
	};
}

export const failed = ( err ) => {
	return {
		type : 'FAILED',
		err
	};
}

/** FETCH ACTIONS */
export const todosFetchData = ( url ) => {
	return ( dispatch ) => {
		axios.get( `${API_URL}${url}` )
		.then(( response ) => {
			dispatch( success( response.data ));
		} )
		.catch(( err ) => dispatch( failed( err )))
	};
}

/** UPDATE ACTIONS */
export const toggleSuccess = ( id ) => {
	return {
		type : 'TOGGLE_TODO_STATUS',
		id   : id
	};
}

export const toggleTodoStatus = ( event ) => {
	return ( dispatch ) => {
		axios.put( `${API_URL}/todos/${event.id}`, {
			completed : event.checked
		} )
		.then(( response ) => {
			dispatch( toggleSuccess( event.id ));
		} )
		.catch(( err ) => dispatch( failed( err )))
	};
}

/** DELETE ACTIONS */
export const deleteSuccess = ( id ) => {
	return {
		type : 'DELETE_TODO',
		id   : id
	};
}

export const deleteTask = ( id ) => {
	return ( dispatch ) => {
		axios.delete( `${API_URL}/todos/${id}` )
		.then(() => {
			dispatch( deleteSuccess( id ));
		} )
		.catch(( err ) => dispatch( failed( err )))
	};
}

/** CREATE ACTIONS */
export const createSuccess = ( data ) => {
	return {
		type : 'ADD_TODO',
		todo : data
	};
}

export const createTask = ( text ) => {
	return ( dispatch ) => {
		axios.post( `${API_URL}/todos/addnew`, {
			title : text
		} )
		.then(( response ) => {
			dispatch( createSuccess( response.data ));
		} )
		.catch(( err ) => dispatch( failed( err )))
	};
}

export const VisibilityFilters = {
	SHOW_ALL       : 'SHOW_ALL',
	SHOW_COMPLETED : 'SHOW_COMPLETED',
	SHOW_ACTIVE    : 'SHOW_ACTIVE'
}
