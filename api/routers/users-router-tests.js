const request = require( 'supertest'            );
const db      = require( '../../data/db-config' );
const server  = require( '../server'            );
//===============================================================>
// Tests
//=====================>
module.exports = userTests = () => {
  describe( 'users-router.js', () => {
    const user = { username: 'test-user', password: 'pass' };
    let token  = null;
    //=====================>
    // Setup
    //=====================>
    // register and login a test user (register and login tests performed separately)
    describe( 'user register/login', () => {
      it( 'should register a test user', async() => {
        await request( server )
          .post( '/api/auth/register' )
          .send( user )
          .then( res => { console.log( 'test user created' ) } );
      } );
      it( 'should login the test user and set token', async() => {
        await request( server )
          .post( '/api/auth/login' )
          .send( user )
          .then( res => {
            console.log( 'test token created' );
            token = res.body.token;
          } );
      } );
    } );
    //=====================>
    // User
    //=====================>
    describe( 'user functionality', () => {
      //=====================> get the user
      describe( 'GET /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .get ( '/api/user'    )
            .set ( 'token', token )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================> update the user
      describe( 'PUT /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .put ( '/api/user'              )
            .send( { password: 'testpass' } )
            .set ( 'token', token           )
            .then( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
      //=====================>
      // User Details
      //=====================>
      describe( 'user details', () => {
        describe( 'POST /user/details', () => {
          it( 'should return a JSON object and a status 201', async() => {
            const details = {
              name: "testing user",
              phone: "random number",
              email: "random email"
            };
            await request( server )
              .post( '/api/user/details' )
              .send( details             )
              .set ( 'token', token      )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'PUT /user/details', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .put ( '/api/user/details'        )
              .send( { phone: 'changed phone' } )
              .set ( 'token', token             )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'GET /user/details', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .get ( '/api/user/details' )
              .set ( 'token', token      )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'DELETE /user/details', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .delete( '/api/user/details' )
              .set   ( 'token', token      )
              .then  ( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
      } );
      //=====================>
      // Contacts
      //=====================>
      describe( 'user contacts', () => {
        describe( 'POST /user/contacts', () => {
          it( 'should return a JSON object and a status 200', async() => {
            const contact = {
              name: 'contact name', 
              phone: 'contact phone'
            };
            await request( server )
              .post( '/api/user/contacts' )
              .send( contact              )
              .set ( 'token', token       )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'PUT /user/contacts', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .put ( '/api/user/contacts'       )
              .send( { phone: "changed phone" } )
              .set ( 'token', token             )
              .set ( 'contact_id', 1            )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'GET /user/contacts', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .get ( '/api/user/contacts' )
              .set ( 'token', token       )
              .then( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
        describe( 'DELETE /user/contacts', () => {
          it( 'should return a JSON object and a status 200', async() => {
            await request( server )
              .delete( '/api/user/contacts' )
              .set   ( 'token', token       )
              .set   ( 'contact_id', 1      )
              .then  ( res => {
                expect( res.type   ).toMatch( /json/i );
                expect( res.status ).toBe   ( 200     );
              } );
          } );
        } );
      } );
      //=====================> delete the user
      describe( 'DELETE /user', () => {
        it( 'should return a JSON object and status 200', async() => {
          await request( server )
            .delete( '/api/user'    )
            .set   ( 'token', token )
            .then  ( res => {
              expect( res.type   ).toMatch( /json/i );
              expect( res.status ).toBe   ( 200     );
            } );
        } );
      } );
    } );
  } );
};
//===============================================================> EOF
