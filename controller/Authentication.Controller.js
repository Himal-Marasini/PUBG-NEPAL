const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const User = require("../model/createUser.model");

const AppError = require("../util/applicationError");
const catchAsync = require("../util/catchAsync");
const {
  validateCreateAccount,
  validateLogin,
  validateChangePassword
} = require("../util/validate");

const reset_token_mail = require("../services/mail/reset_password_mail");
// const reset_token_mail = require("../services/mail/mail_demo");

exports.getLogin = (req, res) => {
  let message = req.flash("error");
  let messageType;

  if (message.length > 0) {
    messageType = "error-active";
  }

  return res.status(200).render("CreateORLogin.ejs", {
    title: "LOGIN",
    error: {
      type: messageType,
      message: message[0]
    }
  });
};

exports.postLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);

  if (error) {
    next(new AppError(error.details[0].message, 400));
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return next(new AppError(`User doesn't exist !! Please Create Account before login`, 400));
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (!doMatch) {
    return next(new AppError("Email or password is incorrect !!", 400));
  }

  // GENERATING AUTH TOKEN
  const token = user.generateAuthToken();

  // SETTING THE TOKEN IN COOKIES AND SENDING THEM TO FRONT END
  sendTokenInCookie(token, res);

  return res.redirect("/");
});

exports.getCreateAccount = (req, res) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "SIGN-UP"
  });
};

exports.postCreateAccount = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, khaltiId, password } = req.body;

  const { error } = validateCreateAccount(req.body);

  if (error) {
    let err = error.details[0].message;
    if (err.includes("confirmPassword")) {
      err = "Confirm password doesn't match !!";
    }
    next(new AppError(err, 400));
    return;
  }

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    next(new AppError("User already exists with this Email or Phone Number !!", 200));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 13);

  const user = new User({
    name,
    email,
    phoneNumber,
    khaltiId,
    password: hashedPassword
  });

  await user.save();

  // GENERATING AUTH TOKEN
  const token = user.generateAuthToken();

  // SETTING THE TOKEN IN COOKIES AND SENDING THEM TO FRONT END
  sendTokenInCookie(token, res);

  return res.json({
    success: true,
    token,
    data: user
  });
});

exports.postChangePassword = catchAsync(async (req, res, next) => {
  const { error } = validateChangePassword(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const doMatch = await bcrypt.compare(req.body.oldPassword, user.password);

  if (!doMatch) {
    return next(new AppError("Old password doesn't match !!", 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 13);

  user.password = hashedPassword;

  await user.save();

  // GENERATING AUTH TOKEN
  const token = user.generateAuthToken();

  // SETTING THE TOKEN IN COOKIES AND SENDING THEM TO FRONT END
  sendTokenInCookie(token, res);

  return res.status(200).json({
    success: false,
    message: "Password has been changed !!"
  });
});

// getLoginIdentity => shows the input form for submiting mail id
exports.getLoginIdentity = catchAsync(async (req, res, next) => {
  return res.render("ForgetPassword");
});

// postLoginIdentity => After getting email id, check if user exists or not
// IF EXISTS THEN SEND THE RESET TOKEN TO EMAIL
exports.postLoginIdentity = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const url = `${req.protocol}://${req.get("host")}`;

  // 1. Check if user exists with email or not
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(
      new AppError(
        `The user doesn't exist with this email Id !! Please <a href="${url}/sign-up" target="_self"> Sign Up </a> before logging in`,
        400
      )
    );
  }

  // 2. Generate a Reset Token
  const resetToken = user.createPasswordResetToken();

  if (!resetToken) {
    return res.json({
      success: true,
      message: `Token has already been send to your email address !! Please check your mail box`
    });
  }
  await user.save(); // because we added the data in a schema inside createPasswordResetToken()

  // 3. Send it to the zuser
  const resetUrl = `${url}/user/reset-password?tok_id=${resetToken}`; // By clicking on this url, User will be able to reset the password

  // 4. Here we using try and catch because error can be thrown by email
  try {
    if (process.env.NODE_ENV === "prod") await reset_token_mail(resetUrl, user.email, res);
    return res.status(200).json({
      success: true,
      message: "Password Reset email has been send to your mail account."
    });
  } catch (err) {
    console.log(err);
    // Sending it to undefined because we have set this inside this function [ user.createPasswordResetToken() ];
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(new AppError("There was error sending the email. Please try again later!", 500));
  }
});

// getResetPassword => Shows the new password form page
exports.getResetPassword = async (req, res, next) => {
  const { tok_id } = req.query;
  return res.render("ResetPassword");

  if (!tok_id) {
    return res.redirect("/");
  }

  const getHashedPassword = crypto.createHash("sha256").update(tok_id).digest("hex");

  const user = await User.findOne({
    passwordResetToken: getHashedPassword,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError("Token Is Invalid Or Session Has Been Expired", 500));
  }

  return res.render("ResetPassword");
};

// patchResetMethod => Verify the token then update the password and save it into db
exports.patchResetPassword = catchAsync(async (req, res, next) => {
  // 1. Extract the token from param or query
  const { tok_id, password } = req.query;

  // 2. Convert the token into hashed token because in DB, We have stored the hashed token
  const getHashedPassword = crypto.createHash("sha256").update(tok_id).digest("hex");
  console.log(1);

  // 3. Find the user with hashedtoken {passwordResetToken:hashedToken} And Validate if it has been expired or not
  const user = await User.findOne({
    passwordResetToken: getHashedPassword,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError("Token Is Invalid Or Session Has Been Expired", 500));
  }

  // 4. Update the new password and set passwordResetToken && passwordExpiresAt === undefined So that token won't work again
  // First, Change it to the hashed password
  const hashedPassword = await bcrypt.hash(req.body.password, 13);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  console.log(2);
  // 5. Sign in the user by sending JWT
  const token = user.generateAuthToken();

  sendTokenInCookie(token, res);

  return res.status(200).json({
    success: true,
    message: "Password has been changed successfully !!"
  });
});

function sendTokenInCookie(token, res) {
  // EXPIRES TIME Is CONVERTED INTO MILLISECONDS
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JTW_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "prod") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
}
