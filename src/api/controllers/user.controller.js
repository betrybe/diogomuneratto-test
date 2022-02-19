const model = require("../models/user.model");
const valid = require("../services/validate");

const index = async (req, res) => {
    
    const users = await model.getAll();
    return res.status(200).json(users);

}

const show = async (req, res) => {
    
    let id = req.params.id;

    const users = await model.get(id);
    return res.status(200).json(users);

}

const store = async (req, res) => {

    let inputs = req.body;
    
    if(valid.isEmpty(inputs.name)) return res.status(400).send('Invalid entries. Try again.');
    if(valid.isEmpty(inputs.email) || !valid.isEmail(inputs.email)) return res.status(400).send('Invalid entries. Try again.');
    if(valid.isEmpty(inputs.password)) return res.status(400).send('Invalid entries. Try again.');

    if(inputs.role != 'admin') inputs.role = 'user';

    const users = await model.save(req.body);
    if(users == false) return res.status(409).send('Email already registered');

    return res.status(201).json(users);

}

const update = async (req, res) => {

    let id = req.params.id;

    const users = await model.update(id, req.body);
    return res.status(200).json(users);

}

const destroy = async (req, res) => {

    let id = req.params.id;

    const users = await model.destroy(id);
    return res.status(200).json(users);

}

module.exports = { index, show, store, update, destroy };