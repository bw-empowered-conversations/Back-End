const db = require( '../dbConfig.js' );

module.exports = {
  add,
  find,
  findBy,
  findByID
};

function find() {
  return db ( 'users'          )
    .select ( 'id', 'username' )
    .orderBy( 'id'             );
}

function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}

async function add( user ) {
  const [ id ] = await db( 'users' ).insert( user );

  return findByID( id );
}

function findByID( id ) {
  return db( 'users'  )
    .where ( { id }   )
    .first();
}
