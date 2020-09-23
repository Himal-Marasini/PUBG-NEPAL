const subdomain = require("express-subdomain");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome to the API");
});

router.get("/users", function (req, res) {
  res.json({
    name: "Himanshu",
    id: "123123123"
  });
});

module.exports = subdomain("api", router);
