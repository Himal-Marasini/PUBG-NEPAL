const express = require("express");
const Router = express.Router();
const isAuth = require("../middleware/isAuth");

Router.get("/", function (req, res) {});

module.exports = Router;
