const Router = require('express');
const auth = require('../middleware/verifyAuthJwt');
const upload = require('../config/multer');

const {
    index,
    show,
    store,
    update,
    destroy,
    uploads,
} = require('../controllers/recipes.controller');

const routes = new Router();

routes.get('/recipes', index);
routes.get('/recipes/:id', show);
routes.post('/recipes', auth, store);
routes.put('/recipes/:id', auth, update);
routes.delete('/recipes/:id', auth, destroy);
routes.put('/recipes/:id/image', upload.single('image'), auth, uploads);

module.exports = routes;