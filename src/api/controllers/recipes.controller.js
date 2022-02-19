const model = require("../models/recipes.model");
const valid = require("../services/validate");
const jwt = require("../services/authJwt");

const index = async (req, res) => {

    const recipes = await model.getAll();
    return res.status(200).json(recipes);

}

const show = async (req, res) => {

    let id = req.params.id;

    const recipe = await model.get(id);
    if (!recipe) return res.status(404).send({ message: 'recipe not found' });

    return res.status(200).json(recipe);

}

const store = async (req, res) => {

    let inputs = req.body;

    let token = await jwt.verifyToken(req.headers.authorization);

    if (valid.isEmpty(inputs.name)) return res.status(400).send({ message: 'Invalid entries. Try again.' });
    if (valid.isEmpty(inputs.ingredients)) return res.status(400).send({ message: 'Invalid entries. Try again.' });
    if (valid.isEmpty(inputs.preparation)) return res.status(400).send({ message: 'Invalid entries. Try again.' });
    if (!token) return res.status(201).send({ message: 'jwt malformed' });

    req.body.userId = token._id;
    
    const recipe = await model.save(req.body);
    
    return res.status(201).json(recipe);

}

const update = async (req, res) => {

    let id = req.params.id;

    const recipe = await model.update(id, req.body);
    return res.status(200).json(recipe);

}

const destroy = async (req, res) => {

    let id = req.params.id;

    const recipe = await model.destroy(id);
    return res.status(200).json(recipe);

}

module.exports = { index, show, store, update, destroy };