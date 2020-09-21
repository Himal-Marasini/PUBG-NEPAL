const express = require("express");
const Route = express.Router();

const demoController = require("../controller/demo.Controller");

Route.get("/send", demoController.demoMail);

module.exports = Route;
