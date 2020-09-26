const moment = require("moment");
const faker = require("faker");
const Match = require("../model/createMatch.model");
const User = require("../model/createUser.model");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/applicationError");

exports.getAllMatches = catchAsync(async (req, res, next) => {
  const { date } = req.query;

  if (date) {
    await getFilterResult(date, res, next);
    return;
  }
  await getAllMatches(req, res, next);
});

exports.getMatchInformation = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.redirect("/admin/dashboard");
  }
  const match = await Match.findById(id);

  return res.render("Admin-MatchDetails.ejs", {
    data: match
  });
});

// exports.getMatchInformation = catchAsync(async (req, res, next) => {
//   const { id, date, time } = req.query;
//   let match = [];
//   if (id) match = await Match.findById(id);
//   else match = await Match.findOne({ date, time });

//   return res.json({
//     success: true,
//     data: match.players
//   });
// });

exports.postCreateMatch = catchAsync(async (req, res) => {
  const { date, device, time, type, map, prize, fee, status } = req.body;

  // Find all the match of date coming from front end
  let validateMatch = await Match.find({ date });

  // el.status.isFinished === true means MATCH HAS BEEN FINISHED
  // Here, Find the match whose (front end time === matches.time) && Check if current time get matched with
  // (status.isFinished == false || status.isFinished == technical error) => It mean with current time, match already exists on DB, It's not finished
  validateMatch = validateMatch.find((el) => {
    if (el.status) {
      return (
        el.time == time &&
        (el.status.isFinished == "false" || el.status.isFinished == "technical error")
      );
    }
  });

  if (validateMatch) {
    return res.status(400).json({
      success: false,
      message: "Match already exists of same date and time !"
    });
  }

  const match = new Match({
    date,
    device,
    time,
    type,
    map,
    prize,
    fee,
    status: {
      isFinished: status.isFinished
    }
  });

  await match.save();

  return res.json({
    success: true,
    data: match
  });
});

// This update the match highlights and winner name
exports.postUpdateWinner_Highlights = catchAsync(async (req, res, next) => {
  const { winners, match_highlights, match_id, isFinished } = req.body;
  let user = null;

  const match = await Match.findById(match_id);

  if (!match) {
    return next(new AppError("The match you have requested for is not available !!", 400));
  }

  if (match.status.winner.user_id !== undefined) {
    if (match_highlights) {
      match.highlights = match_highlights;
      await match.save();
      return next(
        new AppError("Match highlights has been updated and Winner can't be updated again !!", 200)
      );
    }
    return next(new AppError("Match Winner has already been updated", 406));
  }

  if (winners !== undefined) {
    match.status.winner.user_id = winners.user_id;
    match.status.winner.team_name = winners.team_name;
    match.status.winner.members = [
      { name: winners.members[0].name, character_id: winners.members[0].character_id },
      { name: winners.members[1].name, character_id: winners.members[1].character_id },
      { name: winners.members[2].name, character_id: winners.members[2].character_id },
      { name: winners.members[3].name, character_id: winners.members[3].character_id }
    ];
    // After setting the value, Save it
    await match.save();

    // Now Update the Match Played and Match Won
    if (match.status.isFinished == "true") {
      // Updating the Match Played of All the users by 1
      for (var i = 0; i < match.players.length; i++) {
        const element = match.players[i];
        user = await User.findById(element.user_id);
        user.totalMatch += 1;

        //  Updating the league of the player
        if (user.totalMatch >= 20) {
          user.currentLeague = "Gold";
        } else if (user.totalMatch >= 45) {
          user.currentLeague = "Diamond";
        } else if (user.totalMatch >= 95) {
          user.currentLeague = "Crown";
        }
      }
      if (user !== null) await user.save();
      // Updating the Match Won By 1
      const matchWinner = await User.findById(match.status.winner.user_id);
      if (!matchWinner) {
        return next(new AppError("The Match Winner user account Doesn't exisit !!", 400));
      }

      matchWinner.matchWon += 1;
      await matchWinner.save();
    }
  } else {
    match.status.isFinished = isFinished;
    match.highlights = match_highlights;
    await match.save();
  }

  return res.json({
    success: true,
    message: "Match Winner Has been Updated !!",
    data: match
  });
});

exports.postUpdateMatch = catchAsync(async (req, res, next) => {
  let { id, date, time, type, device, map, entry_fee, winning_prize, isFinished } = req.body;
  let formatedTime, formatedFee, formatedWinningPrize;

  const match = await Match.findById(id);

  if (!match) {
    return next(new AppError("Invalid Request !! Match is not available anymore", 400));
  }

  const isValid = moment(date, "YYYY-MM-DD", true).isValid();

  if (!isValid) {
    return next(
      new AppError("Invalid date format: The date format should be YYYY-MM-DD (2020-09-21)", 400)
    );
  }

  if (!time.includes("PM") && !time.includes("AM")) {
    return next(
      new AppError("Invalid time format: The time format should be h:mm (5:25 PM) OR (10:40 AM)")
    );
  }

  if (!entry_fee.includes("NRS") || !winning_prize.includes("NRS")) {
    return next(new AppError("Invalid Format of Entry Fee or Fee: The Format should be 400 NRS"));
  } else {
    formatedFee = entry_fee.split("N")[0];
    formatedWinningPrize = winning_prize.split("N")[0];
  }

  if (time.includes("PM")) {
    const time_check = time.split("P");
    formatedTime = time_check[0] + "PM";
    formatedTime = `${time_check[0]}PM`;
  } else if (time.includes("AM")) {
    const time_check = time.split("A");
    formatedTime = `${time_check[0]}AM`;
  }

  match.date = date;
  match.devicce = device.toUpperCase();
  match.time = formatedTime;
  match.type = type.toUpperCase();
  match.map = map.toUpperCase();
  match.prize = formatedWinningPrize.trim();
  match.fee = formatedFee.trim();
  match.status.isFinished = isFinished;

  await match.save();

  return res.json({
    success: true,
    message: "Match has been updated !!"
  });
});

exports.getUpdateMatchStatus = catchAsync(async (req, res, next) => {
  const { match_id, isFinished } = req.query;

  const match = await Match.findById(match_id);

  if (!match) {
    return next(new AppError("The match you have requested for is not available !!", 400));
  }

  match.status.isFinished = isFinished;

  await match.save();

  return res.json({
    success: true,
    data: match
  });
});

async function getAllMatches(req, res, next) {
  var perPage = 9;
  var page = req.query.page || 1;

  let match = await Match.find()
    .skip(perPage * page - perPage) // 9 * 3 = 27 - 9 = 18(SKIP AGADI ko 18)
    .limit(perPage); // Then Limit After 18 - 27 tak sama and tas paxi ko remove

  const matchCount = await Match.countDocuments();

  const sortMatch = match.sort(function (a, b) {
    return a < b ? 1 : -1;
  });

  return res.render("Admin-Dashboard", {
    data: sortMatch,
    heading: "All Matches",
    current: page,
    pages: Math.ceil(matchCount / perPage)
  });
}

async function getFilterResult(date, res, next) {
  let match = await Match.find({ date: date });

  return res.render("Admin-Dashboard", {
    data: match,
    heading: `All Matches of (${date})`,
    current: null,
    pages: null
  });
}
