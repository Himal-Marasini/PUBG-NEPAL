const bcrypt = require('bcryptjs');

const User = require('../Model/CreateUser');

const validate = require('../util/validate');

exports.getLogin = (req, res) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "LOGIN",
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const { error } = validate.validateLogin(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message
    });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return res.status(400).json({
      status: false,
      message: "User doesn't exist !! Please Create Account before login"
    });
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials !!"
    });
  }
  const token = user.generateAuthToken();

  res.setHeader('x-auth-token', token)
  return res.status(200).json({
    status: true,
    message: "You have been succesfully login !!",
    data: token
  });
};

exports.getCreateAccount = (req, res) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "SIGN-UP",
  });
};

exports.postCreateAccount = async (req, res) => {
  try {
    const { name, email, phoneNumber, khaltiId, password } = req.body;

    const { error } = validate.validateCreateAccount(req.body)

    if (error) {
      let err = error.details[0].message;
      if (err.includes("confirmPassword")) {
        err = "Confirm password doesn't match !!"
      }

      return res.status(400).json({
        status: false,
        message: err
      });
    }

    const userDoc = await User.findOne({ email });

    if (userDoc) {
      return res.json({
        status: true,
        message: "User already exists with this Email or Phone Number !!"
      });
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

    const token = user.generateAuthToken();

    return res.setHeader('x-auth-token', token).json({
      data: true,
      message: user
    });

  } catch (error) {
    return res.json({
      data: false,
      message: error
    });
  }
};
