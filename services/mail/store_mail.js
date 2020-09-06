const sgMail = require("@sendgrid/mail");
const path = require("path");
const ejs = require("ejs");

module.exports = async function sendMail(data, res) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "./template/store_template.ejs"),
      {
        title: "PUBG UC OR FREE FIRE DIAMONDS NEW PURCHASED",
        data
      }
    );

    const msg = {
      to: ["nahsradarahob42@gmail.com", "aashirana87@gmail.com"],
      from: "PUBG MOBILE NEPAL STORE <contact@pubgmobilenp.com>",
      subject: "NEW ORDER HAS BEEN MADE FOR PUBG UC OR FREE FIRE DIAMONDS (IMPORTANT)",
      html: emailTemplate
    };

    await sgMail.send(msg);
  } catch {
    return res.json({
      success: false,
      message: "Fail to send a mail !! Please contact us through facebook page"
    });
  }
};
