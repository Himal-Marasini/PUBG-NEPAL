const axios = require('axios');

module.exports = async (token) => {
    var data = {
        "token": token,
        "amount": 20000
    };

    var config = {
        headers: {
            "Authorization": "Key live_secret_key_95e0c0fb0c2941fdba449459333a5cb7"
        }
    };

    return await axios.post("https://khalti.com/api/v2/payment/verify/", data, config);
};