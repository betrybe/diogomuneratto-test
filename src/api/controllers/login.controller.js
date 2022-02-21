const model = require('../models/login.model');
const valid = require('../services/validate');

const index = async (req, res) => {
    const { email, password } = req.body;
    if (valid.isEmpty(email) || !valid.isEmail(email)) {
        return res.status(401).send({ message: 'All fields must be filled' });
    }
    if (valid.isEmpty(password)) {
        return res.status(401).send({ message: 'All fields must be filled' });
    }

    const data = { email, password };

    const response = await model.login(data);
    
    if (!response) return res.status(401).send({ message: 'Incorrect username or password' });

    return res.status(200).json({ token: response });
};
module.exports = { index };