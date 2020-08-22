const express = require("express");
const Router = express.Router();

const authentication = require("../controller/authentication.Controller");

Router.get("/login", authentication.getLogin);

Router.post("/login", authentication.postLogin);

Router.get("/sign-up", authentication.getCreateAccount);

Router.post("/sign-up", authentication.postCreateAccount);

module.exports = Router;
