const WEBPACK            = require( 'webpack' );
const WEBPACK_DEV_SERVER = require( 'webpack-dev-server' );
const CONFIG             = require( './webpack.config' );

new WEBPACK_DEV_SERVER( WEBPACK ( CONFIG ), {
	publicPath: CONFIG.output.publicPath
})
.listen( 3000, '0.0.0.0', function ( err, result ) {
	if ( err ) {
		console.log( err );
	}

	console.log( 'Running at http://0.0.0.0:3000' );
});
