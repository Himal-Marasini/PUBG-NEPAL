const sgMail = require("@sendgrid/mail");
const path = require("path");
const ejs = require("ejs");

module.exports = async function sendMail(token, email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const emailTemplate = await ejs.renderFile(
    path.join(__dirname, "./template/reset_password_template.ejs"),
    {
      title: "Password Reset PUBGM Nepal",
      token
    }
  );

  const msg = {
    to: email,
    from: "PUBG MOBILE NEPAL <contact@pubgmobilenp.com>",
    subject: "Reset your PUBGM Nepal password (VALID FOR ONLY 10 MINS)",
    text: "Please keep this all detail to Yourself only",
    html: emailTemplate
  };

  sgMail.send(msg);
};
