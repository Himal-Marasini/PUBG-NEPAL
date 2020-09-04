const Match = require("../model/createMatch.model");
const User = require("../model/createUser.model");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/applicationError");

exports.getMatchInformation = catchAsync(async (req, res, next) => {
  const { id, date, time } = req.query;
  let match = [];
  if (id) match = await Match.findById(id);
  else match = await Match.findOne({ date, time });

  return res.json({
    success: true,
    data: match.players
  });
});

exports.postCreateMatch = catchAsync(async (req, res) => {
  const { date, device, time, type, map, prize, fee, status } = req.body;

  // Find all the match of date coming from front end
  let validateMatch = await Match.find({ date });

  // el.status.isFinished === true means MATCH HAS BEEN FINISHED
  // Here, Find the match whose (front end time === matches.time) && Check if current time get matched with
  // (status.isFinished == false || status.isFinished == technical error) => It mean with current time, match already exists on DB, It's not finished
  validateMatch = validateMatch.find((el) => {
    if (el.status) {
      return el.time == time && (el.status.isFinished == "false" || el.status.isFinished == "technical error");
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

exports.postUpdateMatch = catchAsync(async (req, res, next) => {
  const { winners, match_highlights, match_id, isFinished } = req.body;
  let user = null;

  const match = await Match.findById(match_id);

  if (!match) {
    return next(new AppError("The match you have requested for is not available !!", 400));
  }

  if (match.status.winner.user_id !== undefined) {
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
        } else if (user.totalMatch >= 90) {
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
    data: match
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
