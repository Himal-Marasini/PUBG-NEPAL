const validate = require('../util/validate');
const User = require('../models/database/schema');
const Khalti = require('../models/registration').Khalti;

exports.getMoboForm = (req, res, next) => {
    res.render('register-form', {
        matchType: "SQUAD(MOBILE)",
        typeUrl: "/register/moboplayer"
    });
};

exports.getEmuForm = (req, res, next) => {
    res.render('register-form', {
        matchType: "SQUAD(MOBILE)",
        typeUrl: "/register/emuplayer"
    });
};

exports.postMoboForm = async (req, res, next) => {
    console.log(req.body);
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        // return res.status(400).redirect('/register/moboplayer');
        return res.status(400).send(`<h1>Error has been occured</h1>`);
    }

    const Usermobile = new User({
        registratorName: req.body.registratorName,
        teamName: req.body.teamName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        payReceiveId: req.body.payReceiveId,
        matchType: req.body.matchType,
        paymentVerified: false,
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

    // const data = new Khalti(Usermobile);
    Khalti.moboSave(Usermobile);

    // console.log(Usermobile);

};

exports.postEmuForm = async (req, res, next) => {
    // const {
    //     error
    // } = validate(req.body);

    // if (error) {
    //     console.log(error.details[0].message);
    //     // return res.status(400).redirect('/register/moboplayer');
    //     return res.status(400).send(`<h1>Error has been occured</h1>`);
    // }

    // new Form(req.body);

    // console.log('This has been logged from Mobo');

    // Khalti.verified().then(data => {
    //         console.log(data, "The data has been saved to MOBO DATABASE");
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });

};


























// const Usermobile = User('usermobile');
// const usermobile = new Usermobile({
//     registratorName: client.registratorName,
//     teamName: client.teamName,
//     emailId: client.emailId,
//     phoneNumber: client.phoneNumber,
//     payReceiveId: client.payReceiveId,
//     matchType: client.matchType,
//     paymentVerified: false,
//     members: [{
//         name: client.memberOneName,
//         characterID: client.memberOneCharId
//     }, {
//         name: client.memberTwoName,
//         characterID: client.memberTwoCharId
//     }, {
//         name: client.memberThreeName,
//         characterID: client.memberThreeCharId
//     }, {
//         name: client.memberFourName,
//         characterID: client.memberFourCharId
//     }]
// });
// console.log(usermobile);
// await usermobile.save();