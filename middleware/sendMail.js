const nodemailer = require('nodemailer');

module.exports = async function sendMail(userdata) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.smtp2go.com",
        port: 8025,
        auth: {
            user: "pubgnepal",
            pass: "endsMmo1dWphdjAw"
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "contact@pubgmobilenp.com", // sender address
        to: userdata.emailId, // list of receivers
        subject: "MATCH DETAILS", // Subject line
        text: "Please keep this all detail to YourSelf only", // plain text body
        html: `<p>Welcome to PUBG NEPAL</a>` // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};