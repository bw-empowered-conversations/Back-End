const express          = require( 'express'                );
const apiRouter        = require( './routers/router.js'    );
const middlewareConfig = require( './middleware-config.js' );

const server = express();
middlewareConfig( server );

server.use( '/api', apiRouter );

module.exports = server;
