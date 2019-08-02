const nodemailer = require('nodemailer');
const config = require('config');
const jwt = require('jsonwebtoken');

async function verifyEmail(req, res, user) {

    const emailToken = jwt.sign({
        _id: user._id
    }, config.get('jwtEmailVerification'), {
        expiresIn: "6hr"
    });

    const url = `http://localhost:2000/verification/${emailToken}`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1bdc7a56067ecc",
            pass: "8aa87969a6fa0f"
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "rajshh.07@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "confirmation Link", // Subject line
        text: "You can click on the bottom link to verify your account", // plain text body
        html: `<a href=${url}>${url}</a>` // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // res.send('Email Has been send to your Account, Please verify It');

    // next();
    // res.render('loginHomepage.ejs');
}

module.exports = verifyEmail;