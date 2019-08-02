const auth = require('../middleware/tokenAuth');
const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('pubgForm.ejs');
});

module.exports = Router;