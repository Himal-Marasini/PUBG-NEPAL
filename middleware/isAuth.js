const mongoose = require("mongoose");
const User = mongoose.model("user");

const jwt = require("jsonwebtoken");
const AppError = require("../util/applicationError");

module.exports = async function (req, res, next) {
  try {
    // 1. Get the token
    const token = req.cookies.jwt;
    // 2. Check if token exists or not
    // req.originalUrl == "/" [THIS IS HOMEPAGE], We doing this because we want to render two different html file  according to true || false criteria
    if (req.originalUrl == "/") {
      token === "undefined" || token === undefined
        ? (req.isLoggedIn = false)
        : (req.isLoggedIn = true);
      if (!req.isLoggedIn) {
        return next();
      }
    } else {
      // ELSE BLOCK, TRIGGER IN EVERY ROUTE WHOSE ORIGINAL URL !== "/" [HOMEPAGE]
      if (!token) {
        req.flash("error", "You are not logged in ! Please login to get access");
        return res.redirect("/login");
        // next(new AppError('You are not logged in! Please login to get access', 401));
      }
    }

    // 3. Decode the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (!decode) {
      return next(new AppError(decode, 500));
    }

    // 4. Check if user exist or not
    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      // GETTING THE ERROR OF TOO MANY REDIRECTS, SO CLEARING THE COOKIES
      res.cookie("jwt", undefined, {
        expires: new Date(Date.now() + 10 * 0),
        httpOnly: true
      });
      req.flash("error", "User no more exists !! Please login to get access");
      return res.redirect("/login");

      // Don't remove below line, It will be useful while building REST API
      // return next(new AppError("The user no more exists", 401));
    }

    // 5. If user password has been changed, We need to ask for login again
    const isChanged = currentUser.changePasswordAfter(decode.iat);

    if (isChanged) {
      // GETTING THE ERROR OF TOO MANY REDIRECTS, SO CLEARING THE COOKIES
      res.cookie("jwt", undefined, {
        expires: new Date(Date.now() + 10 * 0),
        httpOnly: true
      });

      req.flash("error", "Recently Password has been changed !! Please login again");
      return res.redirect("/login");
      // Don't remove below line, It will be useful while building REST API
      // return next(new AppError("Recently Password has been changed !! Please login again"));
    }

    // Here, Storing our user data on req so that we don't have to reach everytime to database for data
    req.user = currentUser;

    // 6. Grant access to the protected route
    next();
  } catch (err) {
    return next();
  }
};
