const express = require("./node_modules/express");
const Router = express.Router();

const authorization = require("../Controller/Authentication.Controller");

Router.get("/login", authorization.getLogin);

Router.get("/sign-up", authorization.getSignup);

module.exports = Router;
