export function todosHasErrored( state = false, action ) {
	switch ( action.type ) {
		case 'TODOS_HAS_ERRORED':
			return action.hasErrored;
		default :
			return state;
	}
}

export function todosIsLoading( state = false, action ) {
	switch ( action.type ) {
		case 'TODOS_IS_LOADING':
			return action.isLoading;
		default :
			return state;
	}
}

export function todos( state = [], action ) {
	switch ( action.type ) {
		case 'TODOS_FETCH_DATA_SUCCESS':
			return action.todos;
		default :
			return state;
	}
}
