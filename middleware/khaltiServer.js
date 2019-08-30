const Verification = require('../models/registration').Khalti;

exports.postKhaltiData = async (req, res, next) => {

    const token = req.body.token;
    const type = req.body.product_identity;

    const khaltiVerify = new Verification(token, type);
    // return await KhaltiVerify.verified();
};