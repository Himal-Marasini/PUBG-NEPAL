const nodemailer = require('nodemailer');

module.exports = async function sendMail(userdata) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "0a778841b9e317",
            pass: "b2ba4470006141"
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "contact@pubgNepal.com", // sender address
        to: userdata.emailId, // list of receivers
        subject: "MATCH DETAILS", // Subject line
        text: "Please keep this all detail to YourSelf only", // plain text body
        html: `<p>Welcome to PUBG NEPAL</a>` // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

// module.exports = verifyEmail;