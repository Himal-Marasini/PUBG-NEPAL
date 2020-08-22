const moment = require("moment");
const _ = require("lodash");

const User = require("../model/registration");
const Match = require("../model/createMatch");

const khaltiVerification = require("../middleware/khaltiServer");
const sendmail = require("../middleware/sendMail");

const validateWithoutKhaltiData = require("../util/validate").validateWithoutKhaltiData;
const validateWithKhaltiData = require("../util/validate").validateWithKhaltiData;
const AppError = require('../util/applicationError');
const catchAsync = require('../util/catchAsync');

exports.getRegistration = catchAsync(async (req, res, next) => {

  const { id } = req.params;

  const match = await Match.findOne({ _id: id });

  if (!match) {
    next(new AppError("Sorry this match is not available !!", 400));
    // return res.json({
    //   success: true,
    //   message: "Sorry this match is not available !!",
    // });
  }

  return res.render("register-form.ejs", {
    matchType: `${match.type}(${match.device})`,
    id: match._id,
  });

});

exports.postRegistration = catchAsync(async (req, res, next) => {
  const { error } = validateWithKhaltiData(req.body);

  if (error) {
    next(new AppError(error.details[0].message, 400));
    // return res.status(400).json({
    //   success: false,
    //   message: error.details[0].message,
    // });
  }
  // Check Match is Available or Not
  const match = await Match.findOne({ _id: req.body.id });
  console.log(match);
  if (!match) {
    next(new AppError('This match is not available !!', 503));
    // return res.status(503).json({
    //   success: false,
    //   message: "This match is not available !!",
    // });
  }

  const verified = await khaltiVerification(req.body.token, match.fee);

  if (!verified) {
    next(new AppError(verified.error, 400));
    // return res.status(400).json({
    //   success: false,
    //   message: verified.error,
    // });
  }

  const user = new User({
    registratorName: req.body.registrator_name,
    teamName: req.body.registrator_teamName,
    emailId: req.body.registrator_emailId,
    phoneNumber: req.body.registrator_phoneNumber,
    khaltiId: req.body.registrator_khaltiId,
    matchType: req.body.registrator_matchType,
    members: [
      {
        name: req.body.memberOne_name,
        characterID: req.body.memberOne_charId,
      },
      {
        name: req.body.memberTwo_name,
        characterID: req.body.memberTwo_charId,
      },
      {
        name: req.body.memberThree_name,
        characterID: req.body.memberThree_charId,
      },
      {
        name: req.body.memberFour_name,
        characterID: req.body.memberFour_charId,
      },
    ],
    matchId: req.body.id,
    khaltiDetail: {
      idx: verified.data.user.idx,
      name: verified.data.user.name,
      mobile: verified.data.user.mobile,
    },
  });

  // Push the User Object Id into Players Array of Match
  match.players.push(user._id);

  // Save into db
  const updatedMatch = await match.save();

  if (!updatedMatch) {
    next(new AppError(`Match doesn't exist anymore !!`, 400));
  }

  const userdata = await user.save();

  if (userdata) {
    const mailSend = await sendmail(userdata, res);
    return res.status(200).json({
      success: true,
      message:
        "You have been succesfully registered !!! Please Check your mail for futher details",
    });
  }

});

exports.validateData = catchAsync(async (req, res, next) => {
  const {
    registrator_phoneNumber,
    registrator_emailId,
    registrator_teamName,
    id,
  } = req.body;

  const { error } = validateWithoutKhaltiData(req.body);

  if (error) {
    next(error.details[0].message, 400);
    // return res.status(400).json({
    //   success: false,
    //   message: error.details[0].message,
    // });
  }

  const match = await Match.findOne({ _id: id }).populate("players");

  // Check if Match Exists or Not
  if (!match) {
    next(new AppError('Sorry, This match is not available anymore !! Try different matches'), 400);
    // return res.status(400).json({
    //   success: false,
    //   message:
    //     "Sorry, This match is not available anymore !! Try different matches",
    // });
  }

  // Check total number of Squad registered
  if (match.players.length >= 24) {
    next(new AppError("This match lobby is full !! Please try different matches", 400));
    // return res.status(400).json({
    //   success: false,
    //   message: "This match lobby is full !! Please try different matches",
    // });
  }

  // Check if user already registered with Email || Phone number
  const checkUser = match.players.find((el) => {
    return (
      el.emailId == registrator_emailId ||
      el.phoneNumber == registrator_phoneNumber
    );
  });

  if (checkUser) {
    next(new AppError('Email or Phone number has been already registered !!', 400));
    // return res.status(400).json({
    //   success: false,
    //   message: "Email or Phone number has been already registered !!",
    // });
  }

  // Check if Team Name is Unique or Not (Skipping For Now)
  return res.status(200).json({
    success: true,
    message: "Success",
    amount: match.fee * 4 * 100,
    key: process.env.KHALTI_PUBLIC_KEY
  });
});

exports.getUpcomingMatch = catchAsync(async (req, res, next) => {
  let match = await Match.find();

  match.sort(function (a, b) {
    return a.date > b.date ? -1 : 1;
  });

  let date = function (d) {
    return moment(new Date(d.date)).format("DD-MM-YYYY");
  };

  let groupDate = function (group, date) {
    return {
      date: date,
      match: group,
    };
  };

  const newVal = _(match).groupBy(date).map(groupDate).value();

  return res.render("UpcomingMatches", {
    matchInfo: newVal,
    path: "/upcoming-match",
  });
});
