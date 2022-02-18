const router = require('express');

const { index, show, store, update, destroy } = require('../controllers/user.controller');

const routes = new router();

routes.get('/users', index);
routes.get('/users/:id', show);
routes.post('/users', store);
routes.put('/users/:id', update);
routes.delete('/users/:id', destroy);

routes.get('/teste', (req, res) => {
    res.status(200).json({ ok: 'conected' });
});

module.exports = routes;