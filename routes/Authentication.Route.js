const express = require("express");
const Router = express.Router();

const authentication = require("../controller/authentication.Controller");
const isAuth = require("../middleware/isAuth");
const isLoggedIn = require("../middleware/ShowLogin_Signup");

Router.get("/login", isLoggedIn, authentication.getLogin);

Router.post("/login", authentication.postLogin);

Router.get("/logout", authentication.getLogout);

Router.get("/sign-up", isLoggedIn, authentication.getCreateAccount);

Router.post("/sign-up", authentication.postCreateAccount);

Router.post("/user/change-password", isAuth, authentication.postChangePassword);

// Reset Password (EJS ENGINE)
Router.route("/login/identity")
  .get(isLoggedIn, authentication.getLoginIdentity)
  .post(authentication.postLoginIdentity);

Router.route("/user/reset-password")
  .get(isLoggedIn, authentication.getResetPassword)
  .patch(authentication.patchResetPassword);

module.exports = Router;
