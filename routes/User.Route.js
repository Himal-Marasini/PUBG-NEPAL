const express = require("express");
const Router = express.Router();

const user = require("../Controller/User.Controller");
const isAuth = require("../middleware/isAuth");

Router.get("/", user.getHomePage);

module.exports = Router;
