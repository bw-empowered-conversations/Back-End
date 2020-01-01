const request = require( 'supertest'            );
const db      = require( '../../data/db-config' );
const server  = require( '../server'            );
//===============================================================>
// Tests
//=====================>
describe( 'auth-router.js', () => {
  let token = null;
  //=====================>
  // Environment
  //=====================>
  describe( 'environment', () => {
    //=====================> environment variable
    it( 'should set environment to testing', () => {
      expect( process.env.DB_ENV ).toBe( 'testing' );
    } );
  } );
  //=====================>
  // Register
  //=====================>
  describe( 'POST /register', () => {
    // wipe db before each test
    beforeEach( async() => {
      await db( 'users' ).truncate();
    } );
    //=====================> status code 201
    it( 'should return a status 201 created', async() => {
      await request( server )
        .post( '/api/auth/register' )
        .send( { username: 'test', password: 'pass' } )
        .then( res => {
          expect( res.status ).toBe( 201 );
        } );
    } );
    //=====================> json object
    it( 'should return a JSON object', async() => {
      await request( server )
        .post( '/api/auth/register' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
  //=====================>
  // Login
  //=====================>
  describe( 'POST /login', () => {
    //=====================> status code 200
    it( 'should return a status 200 OK', async() => {
      await request( server )
        .post( '/api/auth/login' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          token = res.body.token;
          expect( res.status ).toBe( 200 );
        } );
    } );
    //=====================> json object
    it( 'should return a JSON object', async() => {
      await request( server )
        .post( '/api/auth/login' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
  //=====================>
  // Logout
  //=====================>
  describe( 'GET /logout', () => {
    //=====================> status code 200
    it( 'should return a status 200 OK', async() => {
      await request( server )
        .get( '/api/auth/logout' )
        .set( 'token', token )
        .then( res => {
          expect( res.status ).toBe( 200 );
        } );
    } );
    //=====================> json object
    it( 'should return a JSON object', async() => {
      await request( server )
        .get( '/api/auth/logout' )
        .set( 'token', token )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
} );
//===============================================================> EOF
