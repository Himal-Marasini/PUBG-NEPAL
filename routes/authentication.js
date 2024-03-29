const express = require('express');
const Router = express.Router();

const authorization = require('../controller/authentication');

Router.get('/sign-up', authorization.getSignup);

Router.get('/login', authorization.getLogin);

module.exports = Router;