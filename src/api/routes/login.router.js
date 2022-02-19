const router = require('express');

const { index } = require('../controllers/login.controller');

const routes = new router();

routes.post('/login', index);

module.exports = routes;