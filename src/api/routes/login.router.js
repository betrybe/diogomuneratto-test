const Router = require('express');

const { index } = require('../controllers/login.controller');

const routes = new Router();

routes.post('/login', index);

module.exports = routes;