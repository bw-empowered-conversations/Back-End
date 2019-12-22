const bcrypt = require( 'bcryptjs' );

exports.seed = knex => {
  const pass = bcrypt.hashSync( 'pass', 14 );

  return knex( 'users' )
    .insert( [
      { username: "testuser", password: pass }
    ] );
};
