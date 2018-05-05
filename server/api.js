const BODY_PARSER  = require( 'body-parser' );
const MONGOOSE     = require( 'mongoose' );
const EXPRESS      = require( 'express' );
const URI          = 'mongodb://localhost/todos';
const PORT         = process.env.PORT || 3001;
const TODOS_ROUTES = require( './routers/todos.routers.js' );
const APP          = EXPRESS();

MONGOOSE.Promise = global.Promise;

MONGOOSE.connect( URI, {
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
}).then( 
	() => {
		console.log( 'Successfully connected to the database' );
	},
	err => {
		console.log( 'Could not connect to the database. Exiting now...' );
		process.exit();
	}
);

// Middleware to use for all requests
APP.use( function ( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Credentials', 'true' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE' );
	res.setHeader( 'Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' );
	res.setHeader( 'Cache-Control', 'no-cache' );
	next();
});

APP.use( BODY_PARSER.json() ); // parse requests of content-type - application/json
APP.use( BODY_PARSER.urlencoded( { extended: true } ) ); // parse requests of content-type - application/x-www-form-urlencoded

// All of our routes will be prefixed with /api
APP.use( '/api', TODOS_ROUTES );

// Listen for requests
APP.listen( PORT, function() {
	console.log( 'Server is listening on port 3001' );
});
