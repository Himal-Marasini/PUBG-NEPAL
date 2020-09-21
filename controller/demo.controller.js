const demo = require("../services/mail/mail_demo");

exports.demoMail = async (req, res, next) => {
  await demo(req.body.email, res);
  console.log("Mail has been send !!");
};
