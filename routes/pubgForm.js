const nodemailer = require('../middleware/sendMail');
const khaltiServer = require('../middleware/khaltiServer');
const {
    usermobile,
    validate
} = require('../models/userMobo');
const useremulator = require('../models/userEmu');
// const _ = require('lodash');
const express = require('express');
const Router = express.Router();


Router.get('/moboplayer', (req, res) => {
    res.render('pubgForm', {
        matchType: "SQUAD(MOBILE)",
        typeUrl: "/register/moboplayer"
    });
});

Router.get('/emuplayer', (req, res) => {
    res.render('pubgForm', {
        matchType: "SQUAD(EMULATOR)",
        typeUrl: "/register/emuplayer"
    });
});

Router.post('/moboplayer', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        req.session.messages = {
            type: 'error',
            message: error.details[0].message
        };

        return res.status(400).redirect('/register/moboplayer');
    }

    var token = req.session.token;
    const verifyPayment = await khaltiServer(token.token);

    if (!verifyPayment) {
        return res.status(400).redirect('/register/moboplayer').end();
    }

    usermobo = new usermobile({
        registratorName: req.body.registratorName,
        teamName: req.body.teamName,
        email: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        payReceiveId: req.body.payReceiveId,
        matchType: '(SQUAD) MOBILE',
        members: [{
            name: req.body.memberOneName,
            characterID: req.body.memberOneCharId
        }, {
            name: req.body.memberTwoName,
            characterID: req.body.memberTwoCharId
        }, {
            name: req.body.memberThreeName,
            characterID: req.body.memberThreeCharId
        }, {
            name: req.body.memberFourName,
            characterID: req.body.memberFourCharId
        }]
    });

    await usermobo.save();

    await nodemailer(usermobo.email);

    req.session.messages = {
        type: 'success',
        message: 'Registration has been done. Please Check your mail !!!'
    };

    req.session.save(function () {
        res.redirect('/register/moboplayer');

    });
});

Router.post('/emuplayer', async (req, res) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if (error) {
        req.session.messages = {
            type: 'error',
            message: error.details[0].message
        };

        return res.status(400).redirect('/register/emuplayer');
    }
    const documents = await useremulator.collection.countDocuments();

    if (documents === 25) {
        return res.status(400).send("Registration has been full. Please try on Next Game");
    }

    var token = req.session.token;
    const verifyPayment = await khaltiServer(token.token);

    if (!verifyPayment) {
        console.log('Error Has been Occured');
        return res.status(400).redirect('/register/emuplayer').end();
    }

    useremu = new useremulator({
        registratorName: req.body.registratorName,
        teamName: req.body.teamName,
        email: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        payReceiveId: req.body.payReceiveId,
        matchType: '(SQUAD) EMULATOR',
        members: [{
            name: req.body.memberOneName,
            characterID: req.body.memberOneCharId
        }, {
            name: req.body.memberTwoName,
            characterID: req.body.memberTwoCharId
        }, {
            name: req.body.memberThreeName,
            characterID: req.body.memberThreeCharId
        }, {
            name: req.body.memberFourName,
            characterID: req.body.memberFourCharId
        }]
    });

    await useremu.save();

    await nodemailer(useremu.email);

    req.session.messages = {
        type: 'success',
        message: 'Registration has been done. Please Check your mail !!!'
    };

    req.session.save(function () {
        res.redirect('/register/emuplayer');
    });

    res.send(useremu);
});


module.exports = Router;