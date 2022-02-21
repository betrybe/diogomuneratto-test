const conn = require('../private/db');
const jwt = require('../services/authJwt');

module.exports = {
    login: async (data) => {
        const db = await conn();
        const response = await db.collection('users')
        .findOne({ email: data.email, password: data.password });

        if (!response) return false;
        return jwt.generationToken({
            id: response._id,
            name: response.name,
            email: response.email,
            role: response.role,
        });
    },
};