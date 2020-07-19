const CreateMatch = require('../models/CreateMatch');

exports.postCreateMatch = async (req, res) => {
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
    } catch (err) {
        return res.json({
            status: false,
            message: `Error Occurred: ${err}`
        });
    }
};