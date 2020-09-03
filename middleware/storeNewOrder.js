const sgMail = require('@sendgrid/mail');

module.exports = async function sendMail(data, res) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: 'nahsradarahob42@gmail.com',
            from: 'PUBG MOBILE NEPAL STORE <contact@pubgmobilenp.com>',
            subject: 'NEW ORDER FOR PUBG UC OR FREE FIRE DIAMONDS',
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

                        @media only screen and (max-width:600px){
                            .container{
                                width:100%;
                            }
                        }
                    </style>
                </head>
                
                <body>
                    <div class="container">
                    <p>Hello PUBG MOBILE NEPAL ADMINS,<br /></p>
                    <p> New Registration has been made by ${data.buyer_email} Please check it out </p>
                    <p>Here, are the more details</p>
                    <h2>Buyer Email: ${data.buyer_email} </h2>
                    <h2>Player Id: ${data.buyer_playerId} </h2>
                    <h2>Item: ${data.item} </h2>
                    </div>
                </body>
            </html>`
        };

        await sgMail.send(msg);
    } catch (err) {
        console.log(err)
    }
};