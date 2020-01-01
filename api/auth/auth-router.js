const router     = require( 'express' ).Router();
const bcrypt     = require( 'bcryptjs'          );
const restricted = require( './auth-middleware' );
const jwt        = require( 'jsonwebtoken'      );
const Users      = require( '../../data/models/user-models' );
//===============================================================>
// Register/Login/Logout
//=====================> Register
router.post( '/register', ( req, res ) => {
  const user    = req.body;
  const hash    = bcrypt.hashSync( user.password, 14 );
  user.password = hash;

  Users.addUser( user )
    .then ( saved => { res.status( 201 ).json( saved ); } )
    .catch( error => { res.status( 500 ).json( error ); } );
} );
//=====================> Login
router.post( '/login', ( req, res ) => {
  let { username, password } = req.body;

  Users.findBy( { username } )
    .first()
    .then( user => {
      if ( user && bcrypt.compareSync( password, user.password ) ) {
        const token = signToken( user );
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
//=====================> Logout
router.get( '/logout', restricted, ( req, res ) => {
  return req.session ?
    req.session.destroy( error => {
      error ?
        res.status( 500 ).json( { error: error } )
      : res.status( 200 ).json( { message: 'Successfully logged out' } ) } )
  : res.status( 200 ).json( { message: 'Successfully logged out' } )
} );
//===============================================================>
// Token
//=====================> Create Signed Token
function signToken( user ) {
  const secret  = process.env.JWT_SECRET || 'not very secret in a public repo';

  const payload = { id: user.id };
  const options = { expiresIn: '1h' };

  return jwt.sign ( payload, secret, options );
}

module.exports = router;
//===============================================================> EOF
