const express = require('express');
const Router = express.Router();

const adminController = require('../controllers/admin.controller');

Router.post('/admin/create-match', adminController.postCreateMatch);


module.exports = Router;