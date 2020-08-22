const express = require("express");
const Router = express.Router();

const registration = require("../controller/matchRegistration.Controller");

// Protecting Route Module at last
const isAuth = require("../middleware/isAuth");

Router.get("/register/:id", registration.getRegistration);

Router.post("/register", registration.postRegistration);

Router.post("/register/auth", registration.validateData);

Router.get("/upcoming-match", registration.getUpcomingMatch);

module.exports = Router;