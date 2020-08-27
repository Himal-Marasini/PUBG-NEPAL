const bcrypt = require("bcryptjs");

const User = require("../model/createUser");

const validate = require("../util/validate");
const AppError = require('../util/applicationError');
const catchAsync = require("../util/catchAsync");


exports.getLogin = (req, res) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "LOGIN",
  });
};

exports.postLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validate.validateLogin(req.body);

  if (error) {
    next(new AppError(error.details[0].message, 400));
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    return next(new AppError(`User doesn't exist !! Please Create Account before login`, 400));
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (!doMatch) {
    return next(new AppError("Invalid Credentials !!", 400));
  };

  // GENERATING AUTH TOKEN
  const token = user.generateAuthToken();

  // SETTING THE TOKEN IN COOKIES AND SENDING THEM TO FRONT END
  sendTokenInCookie(token, res);

  return res.redirect('/');
});

exports.getCreateAccount = (req, res) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "SIGN-UP",
  });
};

exports.postCreateAccount = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, khaltiId, password } = req.body;

  const { error } = validate.validateCreateAccount(req.body);

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
    next(new AppError('User already exists with this Email or Phone Number !!', 200));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 13);

  const user = new User({
    name,
    email,
    phoneNumber,
    khaltiId,
    password: hashedPassword,
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

function sendTokenInCookie(token, res) {
  // EXPIRES TIME Is CONVERTED INTO MILLISECONDS
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JTW_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
};