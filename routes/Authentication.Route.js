const express = require("express");
const Router = express.Router();

const authentication = require("../controller/authentication.Controller");
const isAuth = require("../middleware/isAuth");

Router.get("/login", authentication.getLogin);

Router.post("/login", authentication.postLogin);

Router.get("/sign-up", authentication.getCreateAccount);

Router.post("/sign-up", authentication.postCreateAccount);

Router.post("/user/change-password", isAuth, authentication.postChangePassword);

Router.post("/user/reset-password", authentication.postResetPassword);

Router.patch("/user/reset-password/:token", authentication.patchResetPassword);

module.exports = Router;
