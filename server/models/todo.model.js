const MONGOOSE = require( 'mongoose' );
const SCHEMA   = MONGOOSE.Schema;

const TODO_SCHEMA = new SCHEMA( {
	title: {
		required: true,
		type: String,
	},
	completed: {
		type: Boolean,
		default: false
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	lastUpdated: {
		type: Date,
		default: Date.now
	}
});

module.exports = MONGOOSE.model( 'Todo', TODO_SCHEMA );
