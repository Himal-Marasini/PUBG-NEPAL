const registration = require("../controller/registration");
const express = require("express");
const Router = express.Router();

Router.get("/register/:id", registration.getRegistration);

Router.post("/register", registration.postRegistration);

Router.post("/register/auth", registration.validateData);

Router.get("/register/free-match/:id", registration.getFreeMatch);

Router.post("/register/auth/free-match", registration.postFreeMatch);

module.exports = Router;
