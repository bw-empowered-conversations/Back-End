// Seed Contacts Table
//=====================>
exports.seed = function( knex ) {
  return knex( 'contacts' ).insert( [
    { user_id: 1, name: 'jane doe', phone: '555-555-5554' }
  ] );
};
//===============================================================> EOF
