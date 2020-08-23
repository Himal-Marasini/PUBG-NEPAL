const express = require("express");
const Router = express.Router();

const user = require("../controller/user.Controller");
const isAuth = require("../middleware/isAuth");

Router.get("/", isAuth, user.getHomePage);

Router.get("/match-highlights", isAuth, user.getMatchHighlights);

Router.get("/upcoming-tournament", isAuth, user.getTournaments);

Router.get("/recent-winner", isAuth, user.getRecentWinners);

module.exports = Router;
