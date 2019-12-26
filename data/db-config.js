const knex     = require( 'knex'           );
const knexfile = require( '../knexfile.js' );
//===============================================================>
// Environment
//=====================>
const environment = process.env.DB_ENV || 'development';
//===============================================================>

module.exports = knex( knexfile[ environment ] );
//===============================================================> EOF
