const router = require( 'express' ).Router();

const authRouter  = require( '../auth/auth-router' );
const usersRouter = require( './users-router'      );
//===============================================================>
// Use
//=====================>
router.use( '/auth', authRouter  );
router.use( '/user', usersRouter );
//===============================================================>
// Router working message
//=====================>
router.get( '/', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us" } );
} );
//===============================================================>

module.exports = router;
//===============================================================> EOF
