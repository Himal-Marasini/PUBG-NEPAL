const sgMail = require('@sendgrid/mail');

module.exports = async function sendMail(userdata, res) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: userdata.emailId,
            from: 'PUBG MOBILE NEPAL <contact@pubgmobilenp.com>',
            subject: 'Match Details',
            text: 'Please keep this all detail to Yourself only',
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
                            width: 60%;
                            background-color: #fafafa;
                            margin: 0 auto;
                            padding: 0 1rem;
                        }
        
                        #logo_center{
                            display: block;
                            width: 28%;
                            margin: 0 auto;
                        }
                
                        .parent__container {
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
                <p>Hii ${userdata.registratorName},<br>
                    Thanks for participating in PUBG NEPAL matches, you will get the
                    ROOM ID and PASSWORD on registered email address before starting of
                    15 minute of match, Here are the details of your registered team:-</p>
                <table>
                    <tr>
                        <td width="20%">Registrator Name :</td>
                        <td class="text--bold" width="30%">${userdata.registratorName}</td>
                        <td width="13%">Email Id :</td>
                        <td class="text--bold" width="35%">${userdata.emailId}</td>
                    </tr>
                    <tr>
                        <td>Phone Number :</td>
                        <td class="text--bold">${userdata.phoneNumber}</td>
                        <td>Khalti Id :</td>
                        <td class="text--bold">${userdata.khaltiId}</td>
                    </tr>
                    <tr>
                        <td>Team Name :</td>
                        <td class="text--bold" style="text-transform: uppercase;">${userdata.teamName}</td>
                        <td>Match Type :</td>
                        <td class="text--bold">${userdata.matchType}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Team Members name with Character Id:</td>
                    </tr>
                </table>
                <table width="100%">
                    <tr>
                        <td width="30%">${userdata.members[0].name}</td>
                        <td width="10%" class="text--bold">${userdata.members[0].characterID}</td>
                        <td width="30%">${userdata.members[1].name}</td>
                        <td width="10%" class="text--bold">${userdata.members[1].characterID}</td>
                    </tr>
                    <tr>
                        <td>${userdata.members[2].name}</td>
                        <td class="text--bold">${userdata.members[2].characterID}</td>
                        <td>${userdata.members[3].name}</td>
                        <td class="text--bold">${userdata.members[3].characterID}</td>
                    </tr>
                </table>
                <br />
                <p>1. First Position : <b> 1200 </b> </p>
                <p>2. Second Position : <b> 600 </b> </p>
                <p>3. Second Position : <b> 300 </b> </p>
                <p>4. Team with highest kill :  <b> Per Kill * 20</b> </p>
                <br />
                <div class="note">
                    Note:- Sharing the room id and password with others or inviting the others people
                    in a room without PERMISSION of the authorized member will lead to the harsh action immediately.
                </div>
            </div>
            </body>
            </html>`
        };

        await sgMail.send(msg);
    } catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: "Successfully Registered !! You will be updated soon"
        });
    }
};