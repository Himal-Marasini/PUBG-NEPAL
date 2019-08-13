const axios = require('axios');
let khaltiServer = async function (token) {

    var data = {
        "token": token,
        "amount": 20000
    };

    var config = {
        headers: {
            "Authorization": "Key test_secret_key_7e905fd8bdd9430897c79ce057af2512"
        }
    };

    try {
        const response = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config);
        return response;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = khaltiServer;