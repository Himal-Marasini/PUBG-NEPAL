const CreateMatch = require("../model/createMatch");
const catchAsync = require("../util/catchAsync");

exports.postCreateMatch = catchAsync(async (req, res) => {
  const { date, isFinished, device, time, type, map, prize, fee } = req.body;

  let validateMatch = await CreateMatch.find({ date });

  validateMatch = validateMatch.find((el) => {
    return el.time === time && validateMatch.isFinished !== true;
  });

  if (validateMatch) {
    return res.status(400).json({
      success: false,
      message: "Match already exists of same date and time !",
    });
  }

  const match = new CreateMatch({
    date,
    isFinished,
    device,
    time,
    type,
    map,
    prize,
    fee,
  });
  await match.save();

  return res.json({
    success: true,
    data: match,
  });
});
