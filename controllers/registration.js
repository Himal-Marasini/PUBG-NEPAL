const validate = require('../util/validate');
const User = require('../models/Registration');
const khaltiVerification = require('../middleware/khaltiServer');
const sendmail = require('../middleware/sendMail');
const Match = require('../models/CreateMatch');
const { validationResult } = require('express-validator/check');

exports.getRegistration = async (req, res) => {
    try {
        // let count = await Mobile.estimatedDocumentCount({});
        const { id } = req.params;

        const match = await Match.findOne({ _id: id })

        if (!match) {
            return res.json({
                status: true,
                message: 'Sorry this match is not available !!'
            });
        }
        // let message = req.flash('message');
        // let type = req.flash('type');
        let message = [];

        // console.log(message, "Message-18");
        // console.log(type, "Type-19");

        if (message.length <= 0) {
            message = null;
            type = null;
        }

        return res.render('register-form', {
            matchType: `${match.type}(${match.device})`,
            typeUrl: "/register/moboplayer",
            id: match._id,
            docs: 1 < 24 ? true : false,
            errors: message,
            messageType: type
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: `Server error redirect them 505 page ${err}`
        });
    }
};

exports.postRegistration = async (req, res) => {
    try {
        const {
            error
        } = validate(req.body);

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message
            });
        }

        // if (error) {
        //     console.log(error.details[0].message);
        //     // req.flash('message', error.details[0].message);
        //     // req.flash('type', "message__error")
        //     return res.status(400).redirect('/register/moboplayer');
        // }

        const verified = await khaltiVerification(req.body.token);

        if (!verified) {
            console.log(verified.error);
            // req.flash('message', verified.error);
            // req.flash('type', "message__error");
            return res.status(400).redirect('/register/moboplayer');
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

        const match = await Match.findOne({ _id: req.body.id });
        if (!match) {
            return res.status(404).json({
                status: true,
                message: "This match is not available !!"
            })
        }

        match.players.push(user._id);

        const updatedMatch = await match.save();

        if (!updatedMatch) {
            return res.status(500).json({
                status: true,
                message: "Failed to update the data in DB !!"
            });
        }


        const userdata = await user.save();

        if (userdata) {
            // const mailSend = await sendmail(userdata);
            return res.status(200).json({
                status: true,
                message: "You have been succesfully registered !!! Please Check your mail for futher details"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: `Server error redirect them 505 page ${err}`
        });
    }
};

exports.validateData = async (req, res) => {
    try {
        const { registrator_phoneNumber, registrator_emailId, registrator_teamName, id } = req.body;

        const match = await Match
            .findOne({ _id: id })
            .populate('players');

        // Check if Match Exists or Not
        if (!match) {
            return res.status(400).json({
                status: true,
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
            message: "Success"
        });
    } catch (err) {
        return res.json({
            status: false,
            message: `This page should redirect 505 ${err}`
        })
    }
};



exports.getEmuForm = async (req, res, next) => {
    var count = await Mobile.estimatedDocumentCount({});
    res.render('register-form', {
        matchType: "SQUAD(EMULATOR)",
        typeUrl: "/register/emuplayer",
        docs: count < 24 ? true : false,
        success: req.session.success,
        errors: req.session.errors,
        messageType: req.session.messageType
    });
    req.session.errors = null;
    req.session.success = null;
};

exports.postMoboForm = async (req, res, next) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        req.flash('message', error.details[0].message);
        req.flash('type', "message__error")
        return res.status(400).redirect('/register/moboplayer');
    }

    const verified = await khaltiVerification(req.body.token);

    if (!verified) {
        req.flash('message', verified.error);
        req.flash('type', "message__error");
        return res.status(400).redirect('/register/moboplayer');
    }

    const Usermobile = new Mobile({
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
        khaltiDetail: {
            idx: verified.data.user.idx,
            name: verified.data.user.name,
            mobile: verified.data.user.mobile
        }
    });

    const userdata = await Usermobile.save();

    if (userdata) {
        req.flash('type', 'message__success');
        req.flash('message', 'You have been succesfully registered !!! Please Check your mail for futher details');
        // const mailSend = await sendmail(userdata);
        return res.status(200).json({
            status: true,
            redirect: `http://localhost:3000/register/moboplayer`
        });
    }
};

exports.postEmuForm = async (req, res, next) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        req.session.errors = error.details[0].message;
        req.session.success = true;
        req.session.messageType = "message__error";
        return res.status(400).redirect('/register/emuplayer');
    }

    const verified = await khaltiVerification(req.body.token);

    if (!verified) {
        req.session.errors = verified.error;
        req.session.success = true;
        req.session.messageType = "message__error";
        return res.status(400).redirect('/register/emuplayer');
    }

    const Useremulator = new Emulator({
        registratorName: req.body.registrator_name,
        teamName: req.body.registrator_teamName,
        emailId: req.body.registrator_emailId,
        phoneNumber: req.body.registrator_phoneNumber,
        payReceiveId: req.body.registrator_khaltiId,
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
        khaltiDetail: {
            idx: verified.data.user.idx,
            name: verified.data.user.name,
            mobile: verified.data.user.mobile
        }
    });

    const userdata = await Useremulator.save();

    if (userdata) {
        req.session.errors = "You have been succesfully registered !!! Please Check your mail for futher details";
        req.session.success = true;
        req.session.messageType = "message__success";
        const mailSend = await sendmail(userdata);
        return res.status(200).redirect('/register/emuplayer');
    }
};

