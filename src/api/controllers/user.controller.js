const model = require("../models/user.model");
const valid = require("../services/validate");

const index = async (req, res) => {

    const users = await model.getAll();
    return res.status(200).json(users);

}

const show = async (req, res) => {

    let id = req.params.id;

    const user = await model.get(id);
    return res.status(200).json(user);

}

const store = async (req, res) => {

    let inputs = req.body;

    if (valid.isEmpty(inputs.name)) return res.status(400).send({ message: 'Invalid entries. Try again.' });
    if (valid.isEmpty(inputs.email) || !valid.isEmail(inputs.email)) return res.status(400).send({ message: 'Invalid entries. Try again.' });
    if (valid.isEmpty(inputs.password)) return res.status(400).send({ message: 'Invalid entries. Try again.' });

    if (inputs.role != 'admin') inputs.role = 'user';

    const user = await model.save(req.body);
    if (user == false) return res.status(409).send({ message: 'Email already registered' });

    return res.status(201).json(user);

}

const update = async (req, res) => {

    let id = req.params.id;

    const user = await model.update(id, req.body);
    return res.status(200).json(user);

}

const destroy = async (req, res) => {

    let id = req.params.id;

    const user = await model.destroy(id);
    return res.status(200).json(user);

}

module.exports = { index, show, store, update, destroy };