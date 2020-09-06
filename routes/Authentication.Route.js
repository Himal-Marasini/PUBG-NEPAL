const express = require("express");
const Router = express.Router();

const authentication = require("../controller/authentication.Controller");
const isAuth = require("../middleware/isAuth");

Router.get("/login", authentication.getLogin);

Router.post("/login", authentication.postLogin);

Router.get("/sign-up", authentication.getCreateAccount);

Router.post("/sign-up", authentication.postCreateAccount);

Router.post("/user/change-password", isAuth, authentication.postChangePassword);

// Reset Password (EJS ENGINE)
Router.route("/login/identity")
  .get(authentication.getLoginIdentity)
  .post(authentication.postLoginIdentity);

Router.route("/user/reset-password")
  .get(authentication.getResetPassword)
  .patch(authentication.patchResetPassword);

// Router.get("/user/reset-password", authentication.getResetPassword);
// Router.patch("/user/reset-password", authentication.patchResetPassword);

module.exports = Router;
