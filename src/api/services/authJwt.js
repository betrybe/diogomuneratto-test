const jwt = require('jsonwebtoken');

const jwtSecret = 'ingDLMRuGe9UKHRNjs7cYckS2yul4lc3';

const verifyToken = (token) => {
    
    let tokenDecode = '';
    jwt.verify(token, jwtSecret, function (err, decoded) {

        if (err)  return false;
        tokenDecode = decoded;
        
    });

    return tokenDecode;
}

const generationToken = (data) => {
    return { token: jwt.sign(data, jwtSecret) };
}

module.exports = { generationToken, verifyToken }