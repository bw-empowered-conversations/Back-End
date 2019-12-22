
exports.up = function(knex) {
  return knex.schema.createTable( 'users', db => {
    db
      .increments();
    db
      .string( 'username', 128 )
      .notNullable()
      .unique();
    db
      .string( 'password', 128 )
      .notNullable();
  } );
};

exports.down = ( knex ) => { knex.schema.dropTableIfExists( 'users' ) };
