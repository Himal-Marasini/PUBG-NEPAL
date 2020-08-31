const express = require('express');
const Route = express.Router();

const store = require('../controller/store.controller');

Route.get('/store', store.getStore );

module.exports = Route;