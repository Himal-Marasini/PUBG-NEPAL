const express = require("./node_modules/express");
const Router = express.Router();

const adminController = require("../Controller/Admin.Controller");

Router.post("/admin/create-match", adminController.postCreateMatch);

module.exports = Router;
