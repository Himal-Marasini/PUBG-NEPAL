const express = require("express");
const Router = express.Router();

const store = require("../controller/store.Controller");

Router.get("/store", store.getStore);

Router.post("/auth/store", store.postAuthShop);

Router.post("/store", store.postStore);

module.exports = Router;
