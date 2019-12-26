const router        = require( 'express' ).Router();
const Users         = require( '../../data/models/user-models' );
const restricted    = require( '../auth/auth-middleware'       );
const bcrypt        = require( 'bcryptjs'                      );
//===============================================================>
// Gets
//=====================> Get User
router.get( '/', restricted, ( req, res ) => {
  const { id } = req.token;

  Users.findByID( id )
    .then ( user  => { res.json( user ); } )
    .catch( error => {
      res.status ( 500   )
        .json( { error: 'There was a problem fetching the user from the database' } );
    } );
} );
//=====================> Get User's Contacts
router.get( '/contacts', restricted, ( req, res ) => {
  const { id } = req.token;

  Users.findContacts( id )
    .then( contacts => {
      res.status( 200 ).json( contacts );
    } )
    .catch( error => {
      res.status( 500 )
        .json( { error: 'There was a problem fetching the contacts from the database' } );
    } );
} );
//=====================> Get User's Details
router.get( '/details', restricted, ( req, res ) => {
  const { id } = req.token;

  Users.findDetails( id )
    .then( details => {
      res.status( 200 ).json( details );
    } )
    .catch( error => {
      res.status( 500 )
        .json( { error: 'There was a problem fetching the details from the database' } );
    } );
} );
//===============================================================>
// Posts
//=====================> Post User's New Contact Info
router.post( '/contacts', restricted, ( req, res ) => {
  const { id }  = req.token;
  const contact = req.body;

  Users.addContact( id, contact )
    .then ( user  => { res.status( 200 ).json( user ); } )
    .catch( error => { res.status( 500 )
        .json( { error: 'There was a problem adding the contact to the database' } ); } );
} );
//=====================> Post User's New Details
router.post( '/details', restricted, ( req, res ) => {
  const { id }  = req.token;
  const details = req.body;

  Users.addDetails( id, details )
    .then ( user  => { res.status( 200 ).json( user ); } )
    .catch( error => { res.status( 500 )
        .json( { error: 'There was a problem adding the details to the database' } ); } );
} );
//===============================================================>
// Puts
//=====================> Put Updated User
router.put( '/', restricted, ( req, res ) => {
  const { id }  = req.token;
  const changes = req.body;

  if ( changes.password ) { changes.password = bcrypt.hashSync( changes.password, 14 ); }

  Users.findByID( id )
    .then( user => {
      user ?
        Users.updateUser( id, changes )
            .then( updatedUser => res.json( updatedUser ) )
        : res.status( 404 ).json( { message: 'Specified user not found' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'There was a problem updating the user' } );
    } );
} );
//=====================> Put User's Updated Details
router.put( '/details', restricted, ( req, res ) => {
  const { id }  = req.token;
  const changes = req.body;

  Users.findByID( id )
    .then( user => {
      user ?
        Users.updateDetails( id, changes )
            .then( updatedUser => res.json( updatedUser ) )
        : res.status( 404 ).json( { message: 'Specified user not found' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'There was a problem updating the user\'s details' } );
    } );
} );
//=====================> Put User's Updated Contact Info
router.put( '/contacts', restricted, ( req, res ) => {
  const { id }         = req.token;
  const changes        = req.body;
  const { contact_id } = req.headers;

  Users.findByID( id )
    .then( user => {
      user ?
        Users.updateContact( id, changes, contact_id )
            .then( updatedContact => res.json( updatedContact ) )
        : res.status( 404 ).json( { message: 'Specified contact not found' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'There was a problem updating the contact\'s details' } );
    } );
} );
//===============================================================>
// Deletes
//=====================> Delete User
router.delete( '/', restricted, ( req, res ) => {
  const { id } = req.token;

  Users.removeUser( id )
    .then( deleted => {
      deleted ?
          res.json( { removed: deleted } )
        : res.status( 404 ).json( { message: 'The user was not found in the database' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'Failed to delete the user' } ); } );
} );
//=====================> Delete A User's Contact
router.delete( '/contacts', restricted, ( req, res ) => {
  const { id }         = req.token;
  const { contact_id } = req.headers;

  Users.removeContact( id, contact_id )
    .then( deleted => {
      deleted ?
          res.json( { removed: deleted } )
        : res.status( 404 )
          .json( { message: 'The contact was not found in the database' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'Failed to delete the contact' } ); } );
} );
//=====================> Delete User's Detail Info
router.delete( '/details', restricted, ( req, res ) => {
  const { id } = req.token;

  Users.removeDetails( id )
    .then( deleted => {
      deleted ?
          res.json( { removed: deleted } )
        : res.status( 404 )
          .json( { message: 'The details were not found in the database' } );
    } )
    .catch( error => { res.status( 500 )
        .json( { error: 'Failed to delete the details' } ); } );
} );
//===============================================================>

module.exports = router;
//===============================================================> EOF
