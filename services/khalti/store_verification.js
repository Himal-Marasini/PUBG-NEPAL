const axios = require("axios");

module.exports = async (token, amount) => {
  var data = {
    token: token,
    amount: amount
  };

  var config = {
    headers: {
      Authorization: `Key ${process.env.KHALTI_PRIVATE_KEY}`
    }
  };

  return await axios.post("https://khalti.com/api/v2/payment/verify/", data, config);
};
