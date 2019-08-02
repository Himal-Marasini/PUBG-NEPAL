const nodemailer = require('nodemailer');

async function verifyEmail(userMail) {

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
        to: userMail, // list of receivers
        subject: "MATCH DETAILS", // Subject line
        text: "Please keep this all detail to YourSelf only", // plain text body
        html: `<p>Welcome to PUBG NEPAL</a>` // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // res.render('loginHomepage.ejs');
}

module.exports = verifyEmail;