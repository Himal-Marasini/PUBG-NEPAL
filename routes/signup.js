const bcrypt = require('bcrypt');
const _ = require('lodash');
const emailVerification = require('../middleware/emailAuth');
const {
    User,
    validate
} = require('../models/users');
const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index.ejs');
});

Router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).send('The Email ID Already Exist');
    }

    user = new User(_.pick(req.body, ['username', 'email', 'phoneNumber', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // user = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     phoneNumber: req.body.phoneNumber,
    //     password: req.body.password
    // });

    await user.save();

    const token = user.generateAuthToken();

    const emailToken = emailVerification(req, res, user);

    // if (!user.isVerified) {
    //     return res.status(400).send('Please Verify Your Email !!! ');
    // }
    const abc = res.header('x-auth-token', token);
    console.log(abc);

    res.send('Email Has been send to your account');

});

module.exports = Router;