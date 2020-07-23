const validateWithoutKhaltiData = require('../util/validate').validateWithoutKhaltiData;
const validateWithKhaltiData = require('../util/validate').validateWithKhaltiData;
const User = require('../models/Registration');
const khaltiVerification = require('../middleware/khaltiServer');
const sendmail = require('../middleware/sendMail');
const Match = require('../models/CreateMatch');

exports.getRegistration = async (req, res) => {
    try {
        const { id } = req.params;

        const match = await Match.findOne({ _id: id })

        if (!match) {
            return res.json({
                status: true,
                message: 'Sorry this match is not available !!'
            });
        }

        return res.render('register-form', {
            matchType: `${match.type}(${match.device})`,
            id: match._id
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

exports.postRegistration = async (req, res) => {
    try {
        const {
            error
        } = validateWithKhaltiData(req.body);

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message
            });
        }
        // Check Match is Available or Not 
        const match = await Match.findOne({ _id: req.body.id });

        if (!match) {
            return res.status(503).json({
                status: false,
                message: "This match is not available !!"
            });
        }

        const verified = await khaltiVerification(req.body.token, match.fee);

        if (!verified) {
            return res.status(400).json({
                status: false,
                message: verified.error
            });
        }

        const user = new User({
            registratorName: req.body.registrator_name,
            teamName: req.body.registrator_teamName,
            emailId: req.body.registrator_emailId,
            phoneNumber: req.body.registrator_phoneNumber,
            khaltiId: req.body.registrator_khaltiId,
            matchType: req.body.registrator_matchType,
            members: [{
                name: req.body.memberOne_name,
                characterID: req.body.memberOne_charId
            }, {
                name: req.body.memberTwo_name,
                characterID: req.body.memberTwo_charId
            }, {
                name: req.body.memberThree_name,
                characterID: req.body.memberThree_charId
            }, {
                name: req.body.memberFour_name,
                characterID: req.body.memberFour_charId
            }],
            matchId: req.body.id,
            khaltiDetail: {
                idx: verified.data.user.idx,
                name: verified.data.user.name,
                mobile: verified.data.user.mobile
            }
        });

        // Push the User Object Id into Players Array of Match
        match.players.push(user._id);

        // Save into db
        const updatedMatch = await match.save();

        if (!updatedMatch) {
            return res.render('error.ejs', {
                status: false,
                errorType: "Server Down",
                message: {
                    title: '500 !!! INTERNAL SERVER ERROR',
                    subtitle: `PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG.`
                }
            });
        }

        const userdata = await user.save();

        if (userdata) {
            const mailSend = await sendmail(userdata, res);
            return res.status(200).json({
                status: true,
                message: "You have been succesfully registered !!! Please Check your mail for futher details"
            });
        }
    } catch (error) {
        console.error(error);
        const err = new Error("500 !!! INTERNAL SERVER ERROR");
        err.type = "Server Down";
        err.status = 500;
        err.subtitle = "PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG."
        next(err);
    }
};

exports.validateData = async (req, res) => {
    try {
        const { registrator_phoneNumber, registrator_emailId, registrator_teamName, id } = req.body;

        const {
            error
        } = validateWithoutKhaltiData(req.body);

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message
            });
        }

        const match = await Match
            .findOne({ _id: id })
            .populate('players');

        // Check if Match Exists or Not
        if (!match) {
            return res.status(400).json({
                status: false,
                message: "Sorry, This match is not available anymore !! Try different matches"
            });
        }

        // Check total number of Squad registered
        if (match.players.length >= 24) {
            return res.status(400).json({
                status: false,
                message: "This match lobby is full !! Please try different matches"
            });
        }

        // Check if user already registered with Email || Phone number
        const checkUser = match.players.find((el) => {
            return el.emailId == registrator_emailId || el.phoneNumber == registrator_phoneNumber;
        });

        if (checkUser) {
            return res.status(400).json({
                status: false,
                message: "Email or Phone number has been already registered !!"
            })
        }

        // Check if Team Name is Unique or Not (Skipping For Now)
        return res.json({
            status: true,
            message: "Success",
            amount: (match.fee * 4) * 100,
            key: process.env.KHALTI_PUBLIC_KEY
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
