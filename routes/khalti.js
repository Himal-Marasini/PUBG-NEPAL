// const khaltiServer = require('../middleware/khaltiServer');
const axios = require('axios');
const express = require('express');
const Router = express.Router();

Router.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    req.session.token = req.body;
    res.redirect('/register/emuplayer');
});

module.exports = {
    khalti: Router,
    data: this.khaltiServerData,
    config: this.config
};