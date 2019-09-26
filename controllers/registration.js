const validate = require('../util/validate');
const Mobile = require('../models/schema').userMobile;
const Emulator = require('../models/schema').userEmulator;
const khaltiVerification = require('../middleware/khaltiServer');
const sendmail = require('../middleware/sendMail');


exports.getMoboForm = async (req, res, next) => {
    var count = await Mobile.estimatedDocumentCount({});
    res.render('register-form', {
        matchType: "SQUAD(MOBILE)",
        typeUrl: "/register/moboplayer",
        docs: count < 24 ? true : false,
        success: req.session.success,
        errors: req.session.errors,
        messageType: req.session.messageType
    });
    req.session.errors = null;
    req.session.success = null;
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
        req.session.errors = error.details[0].message;
        req.session.success = true;
        req.session.messageType = "message__error";
        return res.status(400).redirect('/register/moboplayer');
    }

    const verified = await khaltiVerification(req.body.token);

    if (!verified) {
        req.session.errors = verified.error;
        req.session.success = true;
        req.session.messageType = "message__error";
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
        req.session.errors = "You have been succesfully registered !!! Please Check your mail for futher details";
        req.session.success = true;
        req.session.messageType = "message__success";
        const mailSend = await sendmail(userdata);
        return res.status(200).redirect('/register/moboplayer');
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