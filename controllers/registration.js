const khaltiVerification = require('../middleware/khaltiServer');
const validate = require('../util/validate');
const Form = require('../models/registration');

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
    const {
        error
    } = validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        // return res.status(400).redirect('/register/moboplayer');
        return res.status(400).send(`<h1>Error has been occured</h1>`);
    }

    const data = new Form(req.body);
    // if (khaltiVerification) {
    //     // with Async and Await
    //     await data.mobosave();
    // }
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

    const data = new Form(req.body);
    console.log(khaltiVerification.data);
    // khaltiVerification
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });

    // console.log(khaltiVerification.verification, "This has been logged from registration controllers");

    data.emusave()
        .then(() => {
            // console.log(`Data has been saved to database`);
        })
        .catch(err => {
            console.log(`Some Error has been Occured`);
        });
    // }


};