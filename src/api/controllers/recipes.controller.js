const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const model = require('../models/recipes.model');
const valid = require('../services/validate');

const index = async (req, res) => {
    const recipes = await model.getAll();
    return res.status(200).json(recipes);
};

const show = async (req, res) => {
    const { id } = req.params;
    const recipe = await model.get(id);
    if (!recipe) return res.status(404).send({ message: 'recipe not found' });
    return res.status(200).json(recipe);
};

const store = async (req, res) => {
    const { name, ingredients, preparation } = req.body;

    if (valid.isEmpty(name)
        || valid.isEmpty(ingredients)
        || valid.isEmpty(preparation)
    ) {
        return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }

    const data = {
        name,
        ingredients,
        preparation,
        userId: ObjectId(req.user.id),
    };

    await model.save(data);
    return res.status(201).json({ recipe: data });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    if (valid.isEmpty(name)
        || valid.isEmpty(ingredients)
        || valid.isEmpty(preparation)
    ) {
        return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }
    const recipe = await model.get(id);
    console.log(recipe.userId, req.user.id);
    if (!recipe) return res.status(404).send({ message: 'recipe not found' });
    console.log(recipe.userId, req.user.id)
    if (recipe.userId == req.user.id || req.user.role === 'admin') {
        const data = { name, ingredients, preparation };

        const response = await model.update(id, data);
        return res.status(200).json(response);
    } 
    return res.status(404).send({ message: 'permission denied' });
};

const destroy = async (req, res) => {
    const { id } = req.params;

    const recipe = await model.get(id);
    if (!recipe.userId) return res.status(404).send({ message: 'recipe not found' });

    if (recipe.userId === req.user.id || req.user.role === 'admin') {
        model.destroy(id);
        return res.status(204).send();
    }
    return res.status(404).send({ message: 'permission denied' });
};

const uploads = async (req, res) => {
    if (valid.isEmpty(req.file) && !req.isImageValid) {
        return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }
    if (!req.isImageValid) {
        return res.status(415).send({ message: 'Only .png, .jpg and .jpeg format allowed!' });
    }
    
    const { id } = req.params;
    const recipe = await model.get(id);

    if (!recipe) return res.status(404).send({ message: 'recipe not found' });
    if (recipe.userId === req.user.id || req.user.role === 'admin') {
        const response = await model.update(id, { 
            image: `${req.headers.host}/src/uploads/${id}.jpeg`, 
        });
        fs.writeFile(`../uploads/${id}.jpeg`, req.file.buffer, 'binary', () => false);
        return res.status(200).json(response);
    } 
    return res.status(404).send({ message: 'permission denied' });
};
module.exports = { index, show, store, update, destroy, uploads };