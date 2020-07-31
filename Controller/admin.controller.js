const CreateMatch = require('../Model/CreateMatch');

exports.postCreateMatch = async (req, res, next) => {
    const { date, isFinished, device, time, type, map, prize, fee } = req.body;
    try {
        let validateMatch = await CreateMatch.find({ date });

        validateMatch = validateMatch.find(el => {
            return el.time === time && validateMatch.isFinished !== true;
        });

        if (validateMatch) {
            return res.json({
                status: false,
                message: 'Match already exists of same date and time !'
            });
        }

        const match = new CreateMatch({ date, isFinished, device, time, type, map, prize, fee });
        await match.save();

        return res.json({
            status: true,
            data: match
        });
    } catch (error) {
        console.error(error);
        const err = new Error("500 !!! INTERNAL SERVER ERROR");
        err.type = "Server Down";
        err.status = 500;
        err.subtitle = "PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG."
        next(err);
    }
};