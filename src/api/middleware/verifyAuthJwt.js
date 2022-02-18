const { verifyToken } = require('../services/authJwt')

module.exports = function(req, res, next) {
    
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'Token não informado.' });
    }

    const decodeToken = verifyToken(token);

    if(!decodeToken){
        return res.status(500).send({ auth: false, message: 'Token inválido.' });
    }

    req.user = decodeToken;
    next();
}