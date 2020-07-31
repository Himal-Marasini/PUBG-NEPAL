const registration = require('../controller/registration');
const express = require('express');
const Router = express.Router();

Router.get('/register/:id', registration.getRegistration);

Router.post('/register', registration.postRegistration);

Router.post('/register/auth', registration.validateData);

module.exports = Router;