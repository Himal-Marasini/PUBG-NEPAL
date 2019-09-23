const express = require('express');
const Router = express.Router();

const authorization = require('../controllers/authentication');

Router.get('/sign-up', authorization.getSignup);

Router.get('/login', authorization.login);