# Back-End
## Introduction
Documentation for bw-empowered-conversations server endpoints.

On successful login, a token is sent back that will be required in the header for all endpoints beyond registration/login.

Contact_id:  Two endpoints require the contact_id to be sent in the header.  Examples are provided.

All example CRUD calls provided are shown for axios, as axios is what I'm most familiar with.

To send the authorization token, I prefer to set up a function such as:
```js
const axiosWithAuth = () => {
  return axios.create( {
    headers: {
      authorization: sessionStorage.getItem( 'token' )
    }
  } );
};
```

And inside the calling function:
```js
...
  const authAxios = axiosWithAuth();

  return authAxios
    .get( 'url', body/header )
    .then(...)
    .catch(...);
...
```
#
<br />

## Base Server Test
---
**_GET_**

To test that the server is up and running:
```js
    .get( https://bw-empowered-conversations.herokuapp.com/api )
```
Should return a json object:
```json
{
  "ServerSays": "All your https are belong to us"
}
```

#
<br />

## Auth
### Register
---
**_POST_**

To register a new user, send a json object in the body:
```js
.post( 'https://bw-empowered-conversations.herokuapp.com/api/auth/register', { username: "user", password: "pass" } )
```
#
### Login
---
**_POST_**

:information_source: **_Recommend checking for user details after login and prompting to fill out the details before continuing if none exist_**

To Login a new user, send a json object in the body:
```js
.post( 'https://bw-empowered-conversations.herokuapp.com/api/auth/login', { username: "user", password: "pass" } )
```
Should return a json welcome message containing the **token**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJib2JiaWVzdWUiLCJpYXQiOjE1Nzc0Mjg5NTUsImV4cCI6MTU3NzQzMjU1NX0.0fHunWbW-syv2oIUM9U90WognvQto78qFjU7uYqd6Bc",
  "message": "Welcome user!"
}
```
#
<br />

## User
### Get the logged in user
---
**_GET_**

:exclamation: *Requires authorization token.*:
```js
.get( 'https://bw-empowered-conversations.herokuapp.com/api/user' )
```
Should return a json user object containing the user **id** and **username**:
```json
{
  "id": 2,
  "username": "user"
}
```
#
### Update a user's info
---
**_PUT_**

:exclamation: *Requires authorization token.*

Also requires a json object in the body which only contains the information to be changed (username and/or password).  If the password changes, the new password will be hashed before being stored in the database:
```js
.put( 'https://bw-empowered-conversations.herokuapp.com/api/user', { password: "newpass" } )
```
Should return a json object containing the user **id** and **username**:
```json
{
  "id": 2,
  "username": "user"
}
```
#
### Delete a user
---
**_DELETE_**

:exclamation: *Requires authorization token.*

Delete a user, which will also delete the user's details and contacts:
```js
.delete( 'https://bw-empowered-conversations.herokuapp.com/api/user' )
```
Should return a json object containing a removed message with an embedded json object of the user that was removed:
```json
{
  "removed": {
    "id": 1,
    "username": "user",
    "password": "$2a$14$SWE5TChcwCo8lpWPPGTIXOP14YfQkenXCF4AYBCndy2tPMmJdvWrC"
  }
}
```
#
<br />

## Contacts
### Get user's contacts
---
**_GET_**

:exclamation: *Requires authorization token.*

Gets a complete list of all contacts for the user:
```js
.get( 'https://bw-empowered-conversations.herokuapp.com/api/user/contacts' )
```
Should return an array of contacts, where each contact is a json object:
```json
[
  {
    "user_id": 3,
    "contact_id": 5,
    "contact_name": "contact name",
    "contact_phone": "555-555-6677"
  },
  {
    "user_id": 3,
    "contact_id": 6,
    "contact_name": "second contact",
    "contact_phone": "555-555-7766"
  }
]
```
#
### Add a contact
---
**_POST_**

:exclamation: *Requires authorization token.*

To add a contact to the user's contact list, send a json object in the body:
```json
const contact = {
	"name": "contact name",
	"phone": "555-555-6677"
};
```
```js
.post( 'https://bw-empowered-conversations.herokuapp.com/api/user/contacts', contact )
```
Should return a json object of the added contact:
```json
{
  "user_id": 2,
  "contact_id": 7,
  "contact_name": "random name",
  "contact_phone": "555-555-9999"
}
```
#
### Update a contact
---
**_PUT_**

:exclamation: *Requires authorization token.*

:exclamation: *Requires contact_id in header.*

To update a specific contact, send the contact_id in the headers and the json object key:value pair to be updated:
```js
.put( 'https://bw-empowered-conversations.herokuapp.com/api/user/contacts', { phone: "555-555-9988" }, { headers: { contact_id: 3 } } )
```
Should return a json object of the contact that was updated:
```json
{
  "user_id": 2,
  "contact_id": 3,
  "contact_name": "contact name",
  "contact_phone": "555-555-9988"
}
```
#
### Delete a contact
---
**_DELETE_**

:exclamation: *Requires authorization token.*

:exclamation: *Requires contact_id in header.*

To update a specific contact, send the contact_id in the headers:
```js
.delete( 'https://bw-empowered-conversations.herokuapp.com/api/user/contacts', { headers: { contact_id: 3 } } )
```
Should return a json object containing a removed message with an embedded json object of the user's contact that was removed:
```json
{
  "removed": {
    "id": 3,
    "user_id": 2,
    "name": "contact name",
    "phone": "555-555-9988"
  }
}
```
#
<br />

## Details
### Get user's details
---
**_GET_**

:exclamation: *Requires authorization token.*

Gets user's details:
```js
.get( 'https://bw-empowered-conversations.herokuapp.com/api/user/details' )
```
Should return a json object of the user's details:
```json
{
  "user_id": 2,
  "user_name": "random user",
  "user_phone": "555-555-5555",
  "user_email": "user23@nomail.com"
}
```
#
### Add details
---
**_POST_**

:exclamation: *Requires authorization token.*

To add details for the user, send a json object in the body:
```json
const details = {
	"name": "random user",
	"phone": "555-555-5555",
	"email": "user23@nomail.com"
};
```
```js
.post( 'https://bw-empowered-conversations.herokuapp.com/api/user/details', details )
```
Should return a json object of the added details:
```json
{
  "user_id": 2,
  "details_id": 2,
  "user_name": "random user",
  "user_phone": "555-555-5555",
  "user_email": "user23@nomail.com"
}
```
#
### Update user's details
---
**_PUT_**

:exclamation: *Requires authorization token.*

To update user's details, send a json object key:value pair to be updated:
```js
.put( 'https://bw-empowered-conversations.herokuapp.com/api/user/details', { phone: "555-555-0011" } )
```
Should return a json object of the contact that was updated:
```json
{
  "user_id": 2,
  "details_id": 2,
  "user_name": "random user",
  "user_phone": "555-555-0011",
  "user_email": "user23@nomail.com"
}
```
#
### Delete user details
---
**_DELETE_**

:exclamation: *Requires authorization token.*

:warning: *Deleting the user's details should trigger the frontend to prompt for new details, or not using this endpoint in favor of the update above*

To delete the user's details:
```js
.delete( 'https://bw-empowered-conversations.herokuapp.com/api/user/details' )
```
Should return a json object containing a removed message with an embedded json object of the user's details that was removed:
```json
{
  "removed": {
    "id": 2,
    "user_id": 2,
    "name": "random user",
    "phone": "555-555-0011",
    "email": "user23@nomail.com"
  }
}
```