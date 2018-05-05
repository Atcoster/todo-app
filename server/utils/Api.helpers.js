const TODO = require( '../models/todo.model.js' );

let actions = {
	getAllTodos: ( req, res, next) => {
		TODO.find(( err, todos ) => {
			if ( err ) return next( err );
				res.json( todos );
		});
	},
	getTodo: ( req, res, next ) => {
		TODO.findById( { _id : req.params.id }, ( err, todo ) => {
			if ( err ) return next( err );
				res.json( todo );
		});
	},
	addTodo: ( data, res ) => {
		const NEW_TODO = new TODO( data );
	
		NEW_TODO.save()
		.then( todo => {
			res.send( 'TODO saved to database' );
		})
		.catch( err => {
			res.status( 400 ).send( err );
		});
	},
	updateTodo: ( req, res, next ) => {
		const DATA = req.body;
		const ID   = req.params.id;
	
		TODO.findByIdAndUpdate( ID, DATA, function( err, todo ) {
			if ( err ) return next( err );
			res.send( `Todo ${ todo.title } successfully updated!` );
		});
	},
	deleteTodo: ( req, res ) => {
		const ID = req.params.id;
	
		TODO.remove( {
			_id: ID
		}, ( err, todo ) => {
			if(err)
				res.send( err );
			res.send( `Todo with id ${ ID } has been deleted successfully!` );
		});
	}
};

exports.actions = actions;
