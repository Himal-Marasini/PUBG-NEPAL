const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. Pleas Login First for Registering for a match');
    try {
        const decoder = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoder;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;