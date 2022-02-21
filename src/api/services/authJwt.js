const jwt = require('jsonwebtoken');

const jwtSecret = 'ingDLMRuGe9UKHRNjs7cYckS2yul4lc3';

const verifyToken = async (token) => jwt.verify(
    token, jwtSecret, (err, decoded) => (err ? false : decoded),
);

const generationToken = (data) => jwt.sign(data, jwtSecret);

module.exports = { generationToken, verifyToken };