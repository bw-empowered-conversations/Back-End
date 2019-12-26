// Seed User_Details Table
//=====================>
exports.seed = function( knex ) {
  return knex( 'user_details' ).insert( [
    { user_id: 1, name: 'john doe', phone: '555-555-5555', email: 'johndoe@nomail.com' }
  ] );
};
//===============================================================> EOF
