const axios = require('axios');

async function verification(token) {
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
        const result = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        return result;
    } catch (err) {
        console.error(err.message, console.log('This has been log from khaltiServer.js'));
    }
}

exports.postKhaltiData = async (req, res, next) => {

    const token = req.body.token;

    const data = await verification(token);
    console.log(data);
    // .then(verified => {
    //     console.log('Succesfully Payment has been done', verified);
    //     return verified;
    // })
    // .catch(err => {
    //     console.error(err);
    // });
    exports.data = data;
};