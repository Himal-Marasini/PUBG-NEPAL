const sgMail = require("@sendgrid/mail");
const path = require("path");
const ejs = require("ejs");

module.exports = async function sendMail(matchInfo, res) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const matchDate = matchInfo.date;
    let date_in_month = matchDate.toString().split("-");
    date_in_month = `${date_in_month[2]} ${month[parseInt(date_in_month[1]) - 1]}`;

    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "template/free_match_registration_template.ejs"),
      {
        data: matchInfo,
        date_in_month: date_in_month.toUpperCase(),
        title: "Free Giveaway Custom Match Registration Mail"
      }
    );

    const msg = {
      to: matchInfo.email,
      from: "PUBG MOBILE NEPAL <contact@pubgmobilenp.com>",
      subject: "Free Giveaway Custom Match Details",
      text: "Please keep this all detail to Yourself only",
      html: emailTemplate
    };

    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Fail to send a mail !! You will be updated soon or Contact our page admin."
    });
  }
};
