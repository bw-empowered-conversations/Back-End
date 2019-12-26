const db = require( '../db-config' );
//===============================================================>
// Exports
//=====================>
module.exports = {
  addUser,
  addContact,
  addDetails,
  findBy,
  findByID,
  findDetails,
  findContacts,
  updateUser,
  updateContact,
  updateDetails,
  removeUser,
  removeContact,
  removeDetails,
};
//===============================================================>
// Adds
//=====================> Add User
async function addUser( user ) {
  const [ id ] = await db( 'users' )
    .insert( user, 'id' );
  return findByID( id );
}
//=====================> Add Contact
async function addContact( id, contact ) {
  const [ contact_id ] = await db( 'contacts' )
    .insert( contact, 'id' );
  return db( 'contacts' )
    .select( 'user_id'
      , 'id as contact_id'
      , 'name as contact_name'
      , 'phone as contact_phone')
    .where( 'id', contact_id );
}
//=====================> Add Details
async function addDetails( id, details ) {
  const [ details_id ] = await db( 'user_details' )
    .insert( details, 'id' );
  return db( 'user_details' )
    .select( 'user_id'
      , 'id as details_id'
      , 'name as user_name'
      , 'phone as user_phone'
      , 'email as user_email')
    .where( 'id', details_id );
}
//===============================================================>
// Finds
//=====================> Find By
function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}
//=====================> Find By Id
function findByID( id ) {
  return db( 'users' )
    .select( 'id', 'username' )
    .where ( { id }  );
}
//=====================> Find Details
function findDetails( id ) {
  return db( 'user_details as ud' )
    .select( 'ud.user_id as user_id'
      , 'ud.name as user_name'
      , 'ud.phone as user_phone'
      , 'ud.email as user_email' )
    .where( 'ud.user_id', id );
}
//=====================> Find Contacts
function findContacts( id ){
  return db( 'contacts as c' )
    .select( 'c.user_id as user_id'
      , 'c.id as contact_id'
      , 'c.name as contact_name'
      , 'c.phone as contact_phone' )
    .where( 'c.user_id', id );
}
//===============================================================>
// Updates
//=====================> Update User
function updateUser( id, changes ) {
  return db( 'users' )
    .where ( { id }  )
    .update( changes )
    .then( () => findByID( id ) );
}
//=====================> Update Contact
function updateContact( id, changes, contact_id ) {
  return db( 'contacts' )
    .join  ( 'users'    )
    .where ( { id: contact_id, user_id: id } )
    .update( changes )
    .then( () => 
      db( 'contacts' )
        .select( 'user_id'
          , 'id as contact_id'
          , 'name as contact_name'
          , 'phone as contact_phone')
        .where( 'id', contact_id )
    );
}
//=====================> Update Details
function updateDetails( id, changes ) {
  return db( 'user_details' )
    .where ( 'user_id', id  )
    .update( changes )
    .then( () => 
      db( 'user_details as ud' )
        .select( 'ud.user_id'
          , 'ud.id as details_id'
          , 'ud.name as user_name'
          , 'ud.phone as user_phone'
          , 'ud.email as user_email')
        .where( 'ud.user_id', id )
    );
}
//===============================================================>
// Removes
//=====================> Remove User
function removeUser( id ) {
  return db( 'users' )
    .where( 'id', id )
    .first()
    .then( user => {
      return user ?
        db( 'users' )
          .where( { id } )
          .del()
          .then( () => user )
        : null;
    } );
}
//=====================> Remove Contact
function removeContact( id, contact_id ) {
  return db( 'contacts' )
    .where( 'id', contact_id )
    .first()
    .then( contact => {
      return contact ?
        db( 'contacts' )
          .where( 'id', contact_id )
          .del()
          .then( () => contact )
        : null;
    } );
}
//=====================> Remove Details
function removeDetails( id ) {
  return db( 'user_details' )
    .where( 'user_id', id )
    .first()
    .then( details => {
      return details ?
        db( 'user_details' )
          .where( 'user_id', id )
          .del()
          .then( () => details )
        : null;
    } );
}
//===============================================================> EOF
