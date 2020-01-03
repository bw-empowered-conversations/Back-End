const apiRouterTest   = require( './api/routers/router-test'        );
const authRouterTests = require( './api/auth/auth-router-tests'     );
const userTests       = require( './api/routers/users-router-tests' );
const db              = require( './data/db-config'                 );
//===============================================================>
// Tests
//=====================>
describe( 'clear test DB then run all tests', () => {
  beforeAll( async() => {
    await db( 'users'        ).truncate();
    await db( 'user_details' ).truncate();
    await db( 'contacts'     ).truncate();
  } );

  describe( 'api-test',   apiRouterTest   );
  describe( 'auth-tests', authRouterTests );
  describe( 'user-tests', userTests       );
} );
//===============================================================> EOF
