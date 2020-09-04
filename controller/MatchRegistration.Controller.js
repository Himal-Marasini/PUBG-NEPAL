const User = require("../model/createUser.model");
const Match = require("../model/createMatch.model");

const khalti_registration_verification = require("../services/khalti/registration_verification");
const send_registration_mail = require("../services/mail/registration_mail");

const validateWithoutKhaltiData = require("../util/validate").validateWithoutKhaltiData;
const validateWithKhaltiData = require("../util/validate").validateWithKhaltiData;
const AppError = require("../util/applicationError");
const catchAsync = require("../util/catchAsync");
const sortMatches = require("../util/sortMatches");

exports.getRegistration = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  const match = await Match.findOne({ _id: id });

  if (!match) {
    return next(new AppError("Sorry this match is not available !!", 400));
    // return res.json({
    //   success: true,
    //   message: "Sorry this match is not available !!",
    // });
  }

  const matchData = {
    id: match._id,
    registratorName: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    khaltiId: user.khaltiId,
    matchType: `${match.type}(${match.device})`
  };

  return res.render("Register-Form.ejs", {
    data: matchData
  });
});

// WITH KHALTI DATA (THIS WILL BE TRIGGERED)
exports.postRegistration = catchAsync(async (req, res, next) => {
  const { error } = validateWithKhaltiData(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // Check Match is Available or Not
  const match = await Match.findOne({ _id: req.body.id });

  if (!match) {
    return next(new AppError("This match is not available !!", 503));
  }

  const verified = await khalti_registration_verification(req.body.token, match.fee);

  if (!verified) {
    return next(new AppError(verified.error, 400));
  }

  const user = await User.findOne({ _id: req.user._id });

  const playerobj = {
    user_id: user._id,
    team_name: req.body.registrator_teamName,
    team_members: [
      { name: req.body.memberOne_name, character_id: req.body.memberOne_charId },
      { name: req.body.memberTwo_name, character_id: req.body.memberTwo_charId },
      { name: req.body.memberThree_name, character_id: req.body.memberThree_charId },
      { name: req.body.memberFour_name, character_id: req.body.memberFour_charId }
    ],
    khalti_detail: {
      idx: verified.data.user.idx,
      name: verified.data.user.name,
      mobile: verified.data.user.mobile
    }
  };

  // Push the PLAYER OBJ with USER_ID,TEAM_MEMBERS AND KHALTI_ID into match players array
  match.players.push(playerobj);

  // Save the MATCH ID into USER REGISTERED MATCH ARRAY
  user.registerMatches.push(match._id);

  // Save to DB (MATCH)
  const updatedMatch = await match.save();

  if (!updatedMatch) {
    return next(new AppError(`Match doesn't exist anymore !!`, 400));
  }

  //  SAVE TO DB USER
  const userdata = await user.save();

  const matchInfo = {
    registrator: userdata.name,
    team_name: req.body.registrator_teamName,
    phone_number: userdata.phoneNumber,
    email: userdata.email,
    khalti_id: userdata.khaltiId,
    match_type: `${match.type}(${match.device})`,
    members: [
      { name: req.body.memberOne_name, character_id: req.body.memberOne_charId },
      { name: req.body.memberTwo_name, character_id: req.body.memberTwo_charId },
      { name: req.body.memberThree_name, character_id: req.body.memberThree_charId },
      { name: req.body.memberFour_name, character_id: req.body.memberFour_charId }
    ]
  };

  if (userdata) {
    if (process.env.NODE_ENV === "prod") await send_registration_mail(matchInfo, res);
    return res.status(200).json({
      success: true,
      message: "You have been succesfully registered !! Please Check your mail for futher details"
    });
  }
});

// WITHOUT KHALTI DATA (THIS WILL BE TRIGGERED)
exports.validateData = catchAsync(async (req, res, next) => {
  const { error } = validateWithoutKhaltiData(req.body);

  if (error) {
    // JOI INVALID STATUS CODE: UNDEFINED (WHEN WE SEND EXTRA VALUE FROM FRONT END) ======/ NEED TO FIX THIS LATER
    return next(error.details[0].message, 400);
  }

  const match = await Match.findOne({ _id: req.body.id }).populate("players");

  // CHECK IF MATCH EXISTS AND CHECK IF IT'S STILL AVALIABLE
  if (!match) {
    return next(new AppError("Sorry, This match is not available anymore !! Try different matches", 400));
  } else if (
    match.status.isFinished == "true" ||
    match.status.isFinished == "technical error" ||
    match.status.isFinished == "registration closed"
  ) {
    return next(new AppError("Registration has been closed for this match !!", 400));
  }

  // Check total number of Squad registered
  if (match.players.length >= 24) {
    return next(new AppError("This match lobby is full !! Please try different matches", 400));
  }

  // Check if user already registered with Email || Phone number (RETHINK ABOUT THIS)
  // Checking if current user is already registered or not
  const checkUser = match.players.find((el) => {
    return req.user._id.toString() === el.user_id.toString();
  });

  if (checkUser) {
    return next(new AppError("You have already been registered for this match !!", 400));
  }

  // Check if Team Name is Unique or Not (This functionality is Skipping For Now)
  return res.status(200).json({
    success: true,
    message: "Success",
    amount: match.fee * 4 * 100,
    key: process.env.KHALTI_PUBLIC_KEY
  });
});

exports.getUpcomingMatch = catchAsync(async (req, res, next) => {
  let match = await Match.find().populate("players");

  // GET ALL THE MATCHES WHOSE STATUS IS NOT TRUE (MEANS MATCH IS NOT OVER)
  let existingMatch = match.filter(
    (el) => el.status.isFinished !== "true" && el.status.isFinished !== "technical error" && el.status.isFinished !== "registration closed"
  );

  // SORT AND GROUP MATCHES ACCORDING TO DATE
  const newVal = sortMatches(existingMatch);

  return res.render("UpcomingMatches", {
    path: "/upcoming-match",
    matchInfo: newVal
  });
});
