const model = require('../models/user.model');
const valid = require('../services/validate');

const index = async (req, res) => {
    const users = await model.getAll();
    return res.status(200).json(users);
};
const show = async (req, res) => {
    const { id } = req.params;

    const user = await model.get(id);
    return res.status(200).json(user);
};
const store = async (req, res) => {
    const { name, email, password } = req.body;

    if (valid.isEmpty(name) 
        || (valid.isEmpty(email) || !valid.isEmail(email)) 
        || valid.isEmpty(password)) {
        return res.status(400).send({
            message: 'Invalid entries. Try again.',
        });
    } 

    const data = { name, email, password, role: 'user' };

    if (req.url === '/users/admin') {
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only admins can register new admins' });
        }
        data.role = 'admin';
    } 

    const user = await model.save(data);
    if (user === false) return res.status(409).send({ message: 'Email already registered' });

    return res.status(201).json(user);
};
module.exports = { index, show, store };