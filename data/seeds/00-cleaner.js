const cleaner = require( "knex-cleaner" );

exports.seed = knex => {
  cleaner.clean ( knex,  {
    mode: 'truncate',
    ignoreTables: [ 'knex_migrations', 'knex_migrations_lock' ]
  } );
};
