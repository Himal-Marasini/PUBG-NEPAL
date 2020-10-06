const express = require("express");
const Router = express.Router();

const registration = require("../controller/matchRegistration.controller");

// Protecting Route Module at last
const isAuth = require("../middleware/isAuth");

Router.get("/register/paid-match/:id", isAuth, registration.getPaidMatchRegistrationForm);

Router.get("/register/free-match/:id", isAuth, registration.getFreeMatchRegistrationForm);

// Authenticate the Match Details without Khalti Data
Router.post("/register/auth/v1/paid-match", isAuth, registration.validateData_PaidMatch);

// Store the match detail after validation Match Details
Router.post("/register/v1/paid-match", isAuth, registration.postPaidMatchRegistration);

Router.post("/register/v1/free-match", isAuth, registration.postFreeMatchRegistration);

Router.get("/upcoming-match", isAuth, registration.getUpcomingMatch);

Router.get("/upcoming/free-match", isAuth, registration.getUpcomingFreeMatch);

Router.get("/article/rule-regulations", registration.getArticles);

module.exports = Router;
