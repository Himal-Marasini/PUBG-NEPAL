const Khalti = require('../models/registration').Khalti;

const axios = require('axios');
const express = require('express');
const Router = express.Router();

Router.use('/register/khalti', async (req, res, next) => {
    const token = req.body.token;
    const type = req.body.product_identity;

    var data = {
        "token": token,
        "amount": 20000
    };

    var config = {
        headers: {
            "Authorization": "Key test_secret_key_7e905fd8bdd9430897c79ce057af2512"
        }
    };

    const result = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config);
    // console.log(result.status);
    Khalti.checking(result);
    return result;
});

exports.Router = Router;