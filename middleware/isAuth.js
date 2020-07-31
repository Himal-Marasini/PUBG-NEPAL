const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log(req.headers)
    const token = req.get('x-auth-token');
    // console.log(token);
};