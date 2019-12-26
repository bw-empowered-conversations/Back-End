exports.up = function( knex ) {
  //=====================>
  // Create Tables
  //=====================>
  return knex.schema
  //=====================> users
  .createTable( 'users', db => {
    db
      .increments();
    db
      .string( 'username', 256 )
      .notNullable()
      .unique();
    db
      .string( 'password', 256 )
      .notNullable();
  } )
  //=====================> user_details
  .createTable( 'user_details', db => {
    db
      .increments();
    db
      .integer( 'user_id' )
      .unsigned()
      .notNullable()
      .references( 'id' )
      .inTable( 'users' )
      .onUpdate( 'CASCADE' )
      .onDelete( 'CASCADE' );
    db
      .string( 'name', 256 )
      .notNullable();
    db
      .string( 'phone', 256 )
      .notNullable();
    db
      .string( 'email', 256 )
      .notNullable();
  } )
  //=====================> contacts
  .createTable( 'contacts', db => {
    db
      .increments();
    db
      .integer( 'user_id' )
      .unsigned()
      .notNullable()
      .references( 'id' )
      .inTable( 'users' )
      .onUpdate( 'CASCADE' )
      .onDelete( 'CASCADE' );
    db
      .string( 'name', 256 )
      .notNullable();
    db
      .string( 'phone', 256 )
      .notNullable();
  } );
};
//===============================================================>
// Drop Tables
//=====================>
exports.down = function( knex ) {
  return knex.schema
    .dropTableIfExists( 'users'        )
    .dropTableIfExists( 'user_details' )
    .dropTableIfExists( 'contacts'     );
};
//===============================================================> EOF
