const EXPRESS = require( 'express' );
const ROUTER  = EXPRESS.Router();
const HELPER  = require( '../utils/Api.helpers.js' );

// Route middleware that will happen on every request
ROUTER.use( ( req, res, next ) => {
	console.log( 'Time: ', Date.now(), 'Something is happening. ' , req.method, req.url );
	next(); // Make sure we go to the next routes and don't stop here
});

// Define the root route
ROUTER.get( '/', ( req, res, next ) => {
	res.json({
		'message': 'Welcome to the Todo Api!'
	});
});

// Define the route to all todos (GET)
ROUTER.get( '/todos', ( req, res, next ) => {
	HELPER.actions.getAllTodos( req, res, next );
});

// Define the route to an todos by id (GET)
ROUTER.get( '/todos/:id', ( req, res, next ) => {
	HELPER.actions.getTodo( req, res, next );
});

// Add an Todo (POST)
ROUTER.post( '/todos/addnew', ( req, res ) => {
	HELPER.actions.addTodo( req.body, res );
});

// Add multiple todos (POST)
ROUTER.post( '/todos/addmultiple', ( req, res ) => {
	const DATA = req.body.todos;

	for ( let todo in DATA ) {
		if ( DATA.hasOwnProperty( todos ) ) {
			HELPER.actions.addTodo( DATA[todos], res );
		}
	}
});

// Update an existing Todo by id (PUT)
ROUTER.put( '/todos/:id', ( req, res, next ) => {
	HELPER.actions.updateTodo( req, res, next );
});

// Delete an Todo by id (DELETE)
ROUTER.delete( '/todos/:id', ( req, res ) => {
	HELPER.actions.deleteTodo( req, res );
});

module.exports = ROUTER;
