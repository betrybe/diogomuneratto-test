const model = require("../models/user.model");

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



    const users = await model.save(req.body);
    return res.status(200).json(users);
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