const model = require("../models/login.model");
const valid = require("../services/validate");

const index = async (req, res) => {
    
    let inputs = req.body;

    if(valid.isEmpty(inputs.email) || !valid.isEmail(inputs.email)) return res.status(401).send('All fields must be filled.');
    if(valid.isEmpty(inputs.password)) return res.status(401).send('All fields must be filled.');

    const response = await model.login(inputs);
    if(!response) return res.status(401).send('Incorrect username or password');

    return res.status(200).json( response );

}


module.exports = { index };