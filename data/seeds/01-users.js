const bcrypt = require( 'bcryptjs' );
//===============================================================> EOF
// Seed Users Table
//=====================>
exports.seed = function( knex ) {
  const pass = bcrypt.hashSync( 'pass', 14 );

  return knex( 'users' )
    .insert( [
      { username: "testuser", password: pass }
    ] );
};
//===============================================================> EOF
