const validate = require('../util/validate');
const Mobile = require('../models/database/schema').userMobile;
const Emulator = require('../models/database/schema').userEmulator;
const khaltiVerification = require('../middleware/khaltiServer');
const sendmail = require('../middleware/sendMail');
const flash = require('connect-flash');


exports.getMoboForm = (req, res, next) => {
    res.render('register-form', {
        matchType: "SQUAD(MOBILE)",
        typeUrl: "/register/moboplayer",
        message: "We request every user to enter correct details"
    });
};

exports.getEmuForm = (req, res, next) => {
    res.render('register-form', {
        matchType: "SQUAD(EMULATOR)",
        typeUrl: "/register/emuplayer",
        message: false
    });
};

exports.postMoboForm = async (req, res, next) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        // return res.status(400).redirect('/register/moboplayer');
        // return req.flash('alert', 'Email Id is required');
        // return res.status(400).send(`<h1>Error has been occured</h1>`);
    }

    const verified = await khaltiVerification(req.body.token);

    // console.log(verified.data);
    if (!verified) {
        return res.send('Error has been occured while processing the payment');
        // return res.send(verified.error);
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
        const mailSend = await sendmail(userdata);
        console.log(mailSend);
    }

};


exports.postEmuForm = async (req, res, next) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        // return res.status(400).redirect('/register/moboplayer');
        return res.status(400).send(`<h1>Error has been occured</h1>`);
    }

    const verified = await khaltiVerification(req.body.token);

    if (!verified) {
        return res.send('Error has been occured while processing the payment');
        // return res.send(verified.error);
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
    const resdata = await Useremulator.save();
    console.log(resdata);
    if (userdata) {
        const mailSend = await sendmail(userdata);
        console.log(mailSend);
    }
};