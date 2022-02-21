const { verifyToken } = require('../services/authJwt');

const verifyAuthJwt = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'missing auth token' });
    }
    const decodeToken = await verifyToken(token);
    if (!decodeToken) {
        return res.status(401).send({ message: 'jwt malformed' });
    }
    req.user = decodeToken;
    next();
};
module.exports = verifyAuthJwt;