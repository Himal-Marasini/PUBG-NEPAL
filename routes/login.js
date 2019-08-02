const auth = require('../middleware/tokenAuth');
const bcrypt = require('bcrypt');
const joi = require('joi');
const {
    User
} = require('../models/users');
const express = require('express');
const Router = express.Router();

Router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) return res.status(400).send(`The Email Id Hasn't been registered yet`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid Email or Password');
    }

    // res.render('loginHomepage.ejs');
    const token = user.generateAuthToken();
    // console.log('LOG IN SUCCESFULLY !!!');
    res.header('x-auth-token', token);
    res.send(token);
});


function validate(inputData) {
    const schema = {
        email: joi.string().min(4).max(50).required().email(),
        password: joi.string().min(6).max(50).required()
    };
    return joi.validate(inputData, schema);
}

module.exports = Router;