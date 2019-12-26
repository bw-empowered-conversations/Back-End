const express          = require( 'express'                );
const apiRouter        = require( './routers/router.js'    );
const middlewareConfig = require( './middleware-config.js' );
//===============================================================>
// Server Config
//=====================>
const server = express();
middlewareConfig( server );
//===============================================================>
// Use
//=====================>
server.use( '/api', apiRouter );
//===============================================================>

module.exports = server;
//===============================================================> EOF
