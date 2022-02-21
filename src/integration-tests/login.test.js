const frisby = require('frisby');
const expect = require('chai').expect;

const conn = require('../api/private/db');

const url = 'http://localhost:3000';

describe('Login Authentic', async function () {

    before(async () => {
        await conn().then((db) => {
            db.collection('users').deleteMany({});
        })
    });

    it('All fields must be filled', async () => {

        await frisby.post(`${url}/login`, {"password" : "12345678"})
        .expect('status', 401)
        .then((response) => {
          const { json } = response;
          expect(json.message).to.equal('All fields must be filled');
        });

    });

    it('Incorrect username or password.', async () => {

        await frisby.post(`${url}/login`, {"email" : "diogo@gmail.com", "password" : "12345678"})
        .expect('status', 401)
        .then((response) => {
          const { json } = response;
          expect(json.message).to.equal('Incorrect username or password');
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

    it('Login Success.', async () => {

        await frisby.post(`${url}/login`, {"email" : "erickjacquin@gmail.com", "password" : "12345678"})
        .expect('status', 200)
        .then((response) => {
          const { json } = response;
          expect(json.token, 'Login Success').to.not.be.null;
        });

    });
    
});