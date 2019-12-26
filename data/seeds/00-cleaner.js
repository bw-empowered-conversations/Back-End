const cleaner = require( "knex-cleaner" );
//===============================================================>
// Truncate DB, ignore migrations
//=====================>
exports.seed = function( knex ) {
  return cleaner.clean ( knex,  {
    mode: 'truncate',
    ignoreTables: [ 'knex_migrations', 'knex_migrations_lock' ]
  } );
};
//===============================================================> EOF
