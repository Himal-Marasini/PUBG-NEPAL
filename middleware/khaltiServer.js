const Verification = require('../models/registration').Khalti;

exports.postKhaltiData = async (req, res, next) => {

    const token = req.body.token;

    const KhaltiVerify = new Verification(token);
    return await KhaltiVerify.verified();

};