const CreateMatch = require("../model/createMatch");
const catchAsync = require("../util/catchAsync");

exports.postCreateMatch = catchAsync(async (req, res) => {
  const { date, device, time, type, map, prize, fee, status } = req.body;

  // Find all the match of date coming from front end
  let validateMatch = await CreateMatch.find({ date });

  // el.status.isFinished === true means MATCH HAS BEEN FINISHED
  // Here, Find the match whose (front end time === matches.time) && Check if current time get matched with 
  // (status.isFinished == false || status.isFinished == technical error) => It mean with current time match already exists on DB, It's not finished
  validateMatch = validateMatch.find((el) => {
    return el.time === time && (el.status.isFinished == false || el.status.isFinished == 'technical error');
  });


  if (validateMatch) {
    return res.status(400).json({
      success: false,
      message: "Match already exists of same date and time !",
    });
  }

  const match = new CreateMatch({
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
