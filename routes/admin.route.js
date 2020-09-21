const express = require("express");
const Router = express.Router();

const adminController = require("../controller/admin.controller");

Router.get("/admin/match-details", adminController.getMatchInformation);

Router.post("/admin/create-match", adminController.postCreateMatch);

// UPDATE THE MATCH HIGHLIGHTS AND WINNER NAME
Router.post("/admin/update-match", adminController.postUpdateMatch);

// UPDATE THE STAUS OF THE MATCH
Router.get("/admin/update-match/status", adminController.getUpdateMatchStatus);

module.exports = Router;
