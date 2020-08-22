const bcrypt = require("bcryptjs");

const User = require("../model/createUser");

const validate = require("../util/validate");
const AppError = require('../util/applicationError');
const catchAsync = require("../util/catchAsync");


// Protecting Route is pendingg
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
    // return res.status(400).json({
    //   success: false,
    //   message: error.details[0].message,
    // });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    next(new AppError(`User doesn't exist !! Please Create Account before login`, 400));
    // return res.status(400).json({
    //   success: false,
    //   message: "User doesn't exist !! Please Create Account before login",
    // });
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    next(new AppError("Invalid Credentials !!", 400));
    // return res.status(400).json({
    //   success: false,
    //   message: "Invalid Credentials !!",
    // });
  }
  const token = user.generateAuthToken();

  res.setHeader("x-auth-token", token);
  return res.status(200).json({
    success: true,
    message: "You have been succesfully login !!",
    data: token,
  });
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
    next(new AppError(err, 400))
    // return res.status(400).json({
    //   success: false,
    //   message: err,
    // });
  }

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    next(new AppError('User already exists with this Email or Phone Number !!', 200))
    // return res.json({
    //   success: true,
    //   message: "ser already exists with this Email or Phone Number !!",
    // });
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

  const token = user.generateAuthToken();

  return res.setHeader("x-auth-token", token).json({
    data: true,
    message: user,
  });

});
