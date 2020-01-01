const request = require( 'supertest'            );
const db      = require( '../../data/db-config' );
const server  = require( '../server'            );
//===============================================================>
// Tests
//=====================> Base api router test
describe( 'router.js', () => {
  describe( 'GET /', () => {
    it( 'should return a JSON object and status 200', async() => {
      await request( server )
        .get( '/api' )
        .then( res => {
          expect( res.type   ).toMatch( /json/i );
          expect( res.status ).toBe   ( 200     );
        } );
    } );
  } );
} );
//===============================================================> EOF
