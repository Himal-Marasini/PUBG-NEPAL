const registration = require('../controllers/registration');
const {
    check
} = require('express-validator/check');

const express = require('express');
const Router = express.Router();


Router.get('/moboplayer', registration.getMoboForm);

Router.get('/emuplayer', registration.getEmuForm);

Router.post('/moboplayer', check(''), registration.postMoboForm);

// Router.post('/emuplayer', check(''), registration.postEmuForm);

module.exports = Router;