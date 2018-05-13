export function todosHasErrored( bool ) {
	return {
		type       : 'TODOS_HAS_ERRORED',
		hasErrored : bool
	};
}

export function todosIsLoading( bool ) {
	return {
		type      : 'TODOS_IS_LOADING',
		isLoading : bool
	};
}

export function todosFetchDataSuccess( todos ) {
	return {
		type  : 'TODOS_FETCH_DATA_SUCCESS',
		todos : todos
	};
}

export function todosFetchData( url ) {
	return ( dispatch ) => {
		dispatch( todosIsLoading( true ));
		fetch( url, {
			method : 'GET'
		} )
		.then(( response ) => {
			if ( !response.ok ) {
				throw Error( response.statusText );
			}
			dispatch( todosIsLoading( false ));
			return response;
		} )
		.then(( response ) => response.json())
		.then(( todos ) => dispatch( todosFetchDataSuccess( todos )))
		.catch(() => dispatch( todosHasErrored( true )));
	};
}
