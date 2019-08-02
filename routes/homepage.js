const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const {
    User
} = require('../models/users');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index.ejs');
});

Router.get('/verification/:token', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.params.token, config.get('jwtEmailVerification'));
        if (!verifyToken) {
            res.status(400).send('Sorry Wrong Token');
        }
        const user = await User.findById(verifyToken._id);
        await user.updateOne({
            isVerified: true
        });
        await user.save();
    } catch (e) {
        res.send('error');
    }
    return res.redirect('http://localhost:2000/loginHomepage');
});

module.exports = Router;