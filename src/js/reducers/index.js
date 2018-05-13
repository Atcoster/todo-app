import { combineReducers } from 'redux';
import { todos, todosHasErrored, todosIsLoading } from './todos';

export default combineReducers( {
	todos,
	todosHasErrored,
	todosIsLoading
} );
