
const axios = require('axios')

module.exports = async (res) => {
    const result = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD`);
    if(result.status !== 200){
        return res.json({
            status:false,
            message:`Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
            occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                target="_blank">facebook</a> page.`
        });
    }
    return (result.data.rates.INR).toFixed(2) * 1.6
}
