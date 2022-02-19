const router = require('express');

const { index, show, store, update, destroy } = require('../controllers/recipes.controller');

const routes = new router();

routes.get('/recipes', index);
routes.get('/recipes/:id', show);
routes.post('/recipes', store);
routes.put('/recipes/:id', update);
routes.delete('/recipes/:id', destroy);

routes.get('/teste', (req, res) => {
    res.status(200).json({ ok: 'conected' });
});

module.exports = routes;