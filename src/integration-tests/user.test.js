const frisby = require('frisby');
const expect = require('chai').expect;

const conn = require('../api/private/db');

const url = 'http://localhost:3000';

describe('Validate users', function () {

  before(async () => {
      await conn().then((db) => {
          db.collection('users').deleteMany({});
      })
  });

  it('Invalid entries. Try again.', async () => {

      await frisby.post(`${url}/users`, {"email" : "erickjacquin@gmail.com", "password" : "12345678"})
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Invalid entries. Try again.');
      });

  });

    
  it('Create users', async () => {

      await frisby.post(`${url}/users`, {"name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678"})
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.user, 'Created users').to.not.be.undefined;
      });

  });
  
  it('Email already registered', async () => {

      await frisby.post(`${url}/users`, {"name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678"})
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Email already registered', 'Email already registered');
      });
  });

});