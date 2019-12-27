const jwt = require( 'jsonwebtoken' );
//===============================================================>
// Middleware to handle authorization restrictions
//=====================> Export Middleware
module.exports = ( req, res, next ) => {
  const token = req.headers.token || req.headers.authorization;

  if ( token ) {
    const secret = process.env.JWT_SECRET || 'not very secret in a public repo';

    jwt.verify( token, secret, ( error, decoded ) => {
      error ?
        res.status( 401 ).json( { message: "Invalid token" } )
        : ( req.token = decoded, next() )
    } ); }
  else {
    res.status( 400 ).json( { message: "Please login and try again" } ); }
};
//===============================================================> EOF
