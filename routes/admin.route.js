const express = require("express");
const Router = express.Router();

const adminController = require("../controller/admin.controller");

Router.get("/admin/dashboard", adminController.getAllMatches);

Router.get("/admin/match-detail", adminController.getMatchInformation);

// Router.get("/admin/match-details", adminController.getMatchInformation);

Router.post("/admin/create-match", adminController.postCreateMatch);

// UPDATE THE MATCH HIGHLIGHTS AND WINNER NAME
// Router.post("/admin/update-match", adminController.postUpdateMatch);
Router.post("/admin/v1/update-match/winner-highlights/", adminController.postUpdateMatch);

// UPDATE THE STAUS OF THE MATCH
Router.get("/admin/update-match/status", adminController.getUpdateMatchStatus);

// FOR UPDATING MATCH
// /admin/v1/update-match

// FOR UPDATING MATCH WINNER AND HIGHLIGHTS
// /admin/v1/update-match/winner-highlights/
module.exports = Router;
