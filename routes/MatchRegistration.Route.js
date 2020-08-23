const express = require("express");
const Router = express.Router();

const registration = require("../controller/matchRegistration.Controller");

// Protecting Route Module at last
const isAuth = require("../middleware/isAuth");

Router.get("/register/:id", isAuth, registration.getRegistration);

Router.post("/register", isAuth, registration.postRegistration);

Router.post("/register/auth", isAuth, registration.validateData);

Router.get("/upcoming-match", isAuth, registration.getUpcomingMatch);

module.exports = Router;
