const express = require("express");
const Router = express.Router();

const user = require("../controller/user.Controller");
const isAuth = require("../middleware/isAuth");

Router.get("/", user.getHomePage);

Router.get("/match-highlights", user.getMatchHighlights);

Router.get("/upcoming-tournament", user.getTournaments);

Router.get("/recent-winner", user.getRecentWinners);

module.exports = Router;
