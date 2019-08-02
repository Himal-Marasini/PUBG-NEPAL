const auth = require('../middleware/tokenAuth');

const express = require('express');
const Router = express.Router();

Router.get('/', auth, (req, res) => {
    res.render('loginHomepage.ejs', {});
});

module.exports = Router;