const sgMail = require("@sendgrid/mail");

module.exports = async function sendMail(userdata, slot, res) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: userdata.emailId,
      from: "PUBG MOBILE NEPAL <contact@pubgmobilenp.com>",
      subject: "CUSTOM GIVEAWAY MATCH DETAILS",
      text: "Please keep this all detail to Yourself only",
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
                <p>Hii Soldiers,<br>
                    Thanks for participating in PUBG MOBILE NEPAL Free Custom Matches, you will get the
                    ROOM ID and PASSWORD on our <a href="https://discord.gg/2cTUVdp" target="_self">DISCORD CHANNEL </a>, 
                    So Join Our Channel And Your SLOT NUMBER is ${slot}</p>
                <br />
                <p>The giveaway result will be posted on Discord Channel only.</p> <br />
                <div>
                Join Our Facebook Page and Discord for latest upgrade about Prize Pool and Free Giveaway Custom Matches:
                <p><a href="https://www.facebook.com/pubgmobilefornepal/" target="_self">Facebook Page</a></p>
                <p><a href="https://discord.gg/2cTUVdp" target="_self">Discord</a></p><br />
                Live Stream will be available at our youtube channel:
                <p><a href="https://www.youtube.com/channel/UCjka13oB7AUQ35DMKVp0kxA" target="_self">Youtube Channel</a></p>
                </div><br />
                <p>Thank You !!</p>
                <p>PUBG MOBILE NEPAL TEAM</p>
            </div>
            </body>
            </html>`
    };

    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      message: "Successfully Registered !! Join Discord for updates"
    });
  }
};
