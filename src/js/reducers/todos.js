export const todos = ( state = [], action ) => {
	console.log( 'state', state );
	console.log( 'action', action );
	switch ( action.type ) {
		case 'SUCCESS': {
			return action.todos;
		}
		case 'FAILED': {
			return action.err;
		}
		case 'TOGGLE_TODO_STATUS': {
			const updatedTasks = state.map(( task ) => {
				if ( task._id === action.id ) {
					return {
						...task,
						completed : !task.completed
					}
				}
				return task;
			} );

			return updatedTasks;
		}
		case 'ADD_TODO': {
			return [
				...state,
				action.todo
			];
		}
		case 'DELETE_TODO': {
			const tasks = state.filter(( task ) => {
				return task._id !== action.id; // return all the taks not matching the action.id
			} )

			return tasks;
		}
		default :
			return state;
	}
}
