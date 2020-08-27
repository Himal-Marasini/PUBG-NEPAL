const Match = require("../model/createMatch");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/applicationError");

exports.postCreateMatch = catchAsync(async (req, res) => {
  const { date, device, time, type, map, prize, fee, status } = req.body;

  // Find all the match of date coming from front end
  let validateMatch = await Match.find({ date });

  // el.status.isFinished === true means MATCH HAS BEEN FINISHED
  // Here, Find the match whose (front end time === matches.time) && Check if current time get matched with 
  // (status.isFinished == false || status.isFinished == technical error) => It mean with current time, match already exists on DB, It's not finished
  validateMatch = validateMatch.find((el) => {
    if (el.status) {
      return el.time == time && (el.status.isFinished == 'false' || el.status.isFinished == 'technical error');
    }
  });

  if (validateMatch) {
    return res.status(400).json({
      success: false,
      message: "Match already exists of same date and time !",
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
    data: match,
  });
});

exports.postUpdateMatch = catchAsync(async (req, res, next) => {
  const { winners, match_highlights, match_id, isFinished } = req.body;

  const match = await Match.findById(match_id);

  if (!match) {
    return next(new AppError("The match you have requested for is not available !!"), 400);
  }

  match.status.winner.team_name = winners.team_name;
  match.status.winner.members = [
    { name: winners.members[0].name, character_id: winners.members[0].character_id },
    { name: winners.members[1].name, character_id: winners.members[1].character_id },
    { name: winners.members[2].name, character_id: winners.members[2].character_id },
    { name: winners.members[3].name, character_id: winners.members[3].character_id }
  ];
  match.status.isFinished = isFinished;
  match.highlights = match_highlights;

  await match.save();

  return res.json({
    success: true,
    data: match
  });
});

exports.getUpdateMatchStatus = catchAsync(async (req, res, next) => {
  const { match_id, isFinished } = req.query;

  const match = await Match.findById(match_id);

  if (!match) {
    return next(new AppError("The match you have requested for is not available !!"), 400)
  };

  match.status.isFinished = isFinished;

  await match.save();

  return res.json({
    success: true,
    data: match
  });

});


