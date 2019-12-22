const router = require( 'express'  ).Router();

const bcrypt = require( 'bcryptjs'     );
const jwt    = require( 'jsonwebtoken' );

const Users  = require( '../../../data/models/userModel' );

router.post( '/register', ( req, res ) => {
  const user    = req.body;
  const hash    = bcrypt.hashSync( user.password, 14 );
  user.password = hash;

  Users.add( user )
    .then ( saved => { res.status( 201 ).json( saved ); } )
    .catch( error => { res.status( 500 ).json( error ); } );
} );

router.post( '/login', ( req, res ) => {
  let { username, password } = req.body;

  Users.findBy( { username } )
    .first()
    .then( user => {
      if ( user && bcrypt.compareSync( password, user.password ) ) {
        const token = signToken( user );
        console.log( token );
        res
          .status( 200 )
          .json( { token, message: `Welcome ${ user.username }!` } ); }
      else {
        res
          .status( 401 )
          .json( { message: 'Invalid Credentials!' } ); }
    } )
    .catch( error => { res.status( 500 ).json( error ); } );
} );

router.get( '/logout', ( req, res ) =>
  req.session ?
    req.session.destroy( error => {
      error ?
        res.status( 500 ).json( { message: 'You can chekout any time you like but you can never leave!!' } )
      : res.status( 200 ).json( { message: 'Logged out' } ) } )
  : req.token ?
      ( req.token = null, res.status( 200 ).json( { message: 'Token revoked. Logged out' } ) )
      : res.status( 200 ).json( { message: 'Successfully logged out' } )
);

function signToken( user ){
  const secret  = process.env.JWT_SECRET || 'not very secret in a public repo';

  const payload = { username: user.username };
  const options = { expiresIn: '1h' };

  return jwt.sign ( payload, secret, options );
}

module.exports = router;
