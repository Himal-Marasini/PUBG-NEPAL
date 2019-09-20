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
        from: '"PUBG NEPAL" <contact@pubgmobilenp.com>', // sender address
        to: userdata.emailId, // list of receivers
        subject: "MATCH DETAILS", // Subject line
        text: "Please keep this all detail to YourSelf only", // plain text body
        html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Message Detail</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: content-box;
        }

        html {
            font-size: 18px;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 32px;
            text-rendering: optimizeLegibility;
            color: #212121;
        }

        .container {
            width: 90%;
            background-color: #fafafa;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .parent__container {
            display: grid;
            grid-template-columns: auto;
            padding-left: 2rem;
            color: #272829;
        }

        .text--bold {
            color: #e08012;
            font-weight: 500;
        }

        .member__text {
            padding-left: 2rem;
            color: #272829;
        }

        .note {
            margin-top: 2rem;
            color: #c0392b;
            text-transform: uppercase;
            font-style: italic;
            font-size: 14px;
            line-height: 18px;
            font-weight: bold;
        }
        @media only screen and (max-width:600px){
            .parent__container{
                padding-left:0;
            }
            .container{
                width:100%;
            }
            .note{
                font-size:10px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <p>Hey ${userdata.registratorName},<br>
            Thanks for participating in PUBG NEPAL tournament, you will get the
            ROOM ID and PASSWORD on registered email address before starting of
            15 minute of match, Here are the details of your registered team:-</p>
        <div class="parent__container">
            <div>
                <p>Registrator Name: <span class="text--bold">${userdata.registratorName}</span></p>
            </div>
            <div>
                <p>Email Id: <span class="text--bold">${userdata.emailId}</span></p>
            </div>
            <div>
                <p>Phone Number: <span class="text--bold">${userdata.phoneNumber}</span></p>
            </div>

            <div>
                <p>Khalti ID: <span class="text--bold">${userdata.khaltiId}</span></p>
            </div>
            <div>
                <p>Match Type: <span class="text--bold">${userdata.matchType}</span></p>
            </div>
            <div>
                <p>Team Name: <span class="text--bold">${userdata.teamName}</span></p>
            </div>

        </div>
        <div class="members__detail">
            <p class="member__text">Team Member Name with Character Id: </p>
            <div class="parent__container">
                <div>
                    <p>${userdata.members[0].name}</p>
                </div>
                <div class="text--bold">
                    <p>${userdata.members[0].characterID}</p>
                </div>
                <div>
                    <p>${userdata.members[1].name}</p>
                </div>
                <div class="text--bold">
                    <p>${userdata.members[1].characterID}</p>
                </div>
                <div>
                    <p>${userdata.members[2].name}</p>
                </div>
                <div class="text--bold">
                    <p>${userdata.members[2].characterID}</p>
                </div>
                <div>
                    <p>${userdata.members[3].name}</p>
                </div>
                <div class="text--bold">
                    <p>${userdata.members[3].characterID}</p>
                </div>
            </div>
        </div>
        <div class="note">
            Note:- Sharing the room id and password with others or inviting the others people
            in a room without PERMISSION of the authorized member will lead to the harsh action immediately.
        </div>
    </div>
</body>

</html>`
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};