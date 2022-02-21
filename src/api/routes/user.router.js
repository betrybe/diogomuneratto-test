const Router = require('express');
const auth = require('../middleware/verifyAuthJwt');

const { index, show, store } = require('../controllers/user.controller');

const routes = new Router();

routes.get('/users', index);
routes.get('/users/:id', show);
routes.post('/users', store);

routes.post('/users/admin', auth, store);

module.exports = routes;