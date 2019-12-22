const router     = require( 'express' ).Router();
const Users      = require( '../../data/models/user-models' );
const restricted = require( '../auth/auth-middleware'       );

router.get( '/', ( req, res ) => {
  Users.find()
    .then ( users => { res.json( users ); } )
    .catch( error => {
      console.log( error );
      res.status ( 500   ).json( { you: 'shall not pass!' } );
    } );
} );

module.exports = router;
