const frisby = require('frisby');
const expect = require('chai').expect;

const conn = require('../api/private/db');

const url = 'http://localhost:3000';
let token = '';
let id = ';'

describe('validate recipes', function () {

    before(async () => {
        await conn().then((db) => {
            db.collection('users').deleteMany({});
            db.collection('recipes').deleteMany({});
        })
    });

    it('Create users', async () => {

        await frisby.post(`${url}/users`, {"name" : "Diogo Muneratto", "email" : "admin@admin.com", "password" : "admin"})
        .expect('status', 201)
        .then((response) => {
        const { json } = response;
        expect(json.user, 'Created users').to.not.be.undefined;
        });

    });

    it('Login Success.', async () => {

        await frisby.post(`${url}/login`, {"email" : "admin@admin.com", "password" : "admin"})
        .expect('status', 200)
        .then((response) => {
          const { json } = response;
          token = json.token
          expect(json.token, 'Login Success').to.not.be.null;
        });

    });

    it('Create recipes not token', async () => {
        await frisby.post(`${url}/recipes`, { "name": "string", "ingredients": "string", "preparation": "string" })
        .expect('status', 401)
        .then((response) => {
            const resp = JSON.parse(response.body);
            expect(resp.message).to.equal('missing auth token', 'missing auth token');
        })
    });

    it('Create recipes', async () => {
        await frisby.setup({
            request: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        }, true).post(`${url}/recipes`, { "name": "string", "ingredients": "string", "preparation": "string" })
        .expect('status', 201)
        .then((response) => {
            const resp = JSON.parse(response.body);
            id = resp.recipe._id;
            expect(response.recipe, 'Create recipes Success').to.not.be.null;
        })
    });

    it('Update recipes not token', async () => {
        await frisby.put(`${url}/recipes/${id}`, { "name": "string", "ingredients": "string", "preparation": "string" })
        .expect('status', 401)
        .then((response) => {
            const resp = JSON.parse(response.body);
            expect(resp.message).to.equal('missing auth token', 'missing auth token');
        })
    });
    
    it('Update recipes', async () => {
        await frisby.setup({
            request: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        }, true).put(`${url}/recipes/${id}`, { "name": "Receita do Jacquin", "ingredients": "Frango", "preparation": "10 minutos no forno" })
        .expect('status', 200)
        .then((response) => {
            const resp = JSON.parse(response.body);
            id = resp._id;
            expect(response.recipe, 'Create recipes Success').to.not.be.null;
        })
    });

    it('List all recipes', async () => {
        await frisby.get(`${url}/recipes`)
        .expect('status', 200)
        .then((response) => {
            expect(response[0], 'List all recipes com success').to.not.be.null;
        })
    });

    it('List recipes id', async () => {
        await frisby.get(`${url}/recipes/${id}`)
        .expect('status', 200)
        .then((response) => {
            expect(response.userId, 'List recipe com success').to.not.be.null;
        })
    });

});