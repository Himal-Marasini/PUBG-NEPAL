const getDollarRates = require('../util/getDollarRates');
const { identity } = require('lodash');

exports.getStore = (req,res,next) => {
    return res.render('store')
};

exports.postAuthShop = async (req,res,next) => {
    const {email, player_id, uc, diamonds} = req.body;
    let totalPrice;

    let nepaliOneDollarPrice = await getDollarRates();
    
    const uc_value_with_amt = { 
        uc_1: {
            quantity:"30 + 2 UC",
            amount:(64).toFixed(2),
            service_charge: Math.floor(64 * 0.05).toFixed(2),
            _id:"uc_1"
        },
        uc_2: {
            quantity:"60 + 3 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_2"
        },
        uc_3:{
            quantity:"300 + 40 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_3"
        },
        uc_4:{ 
            quantity:"600 + 90 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_4"
        },
        uc_5:{
            quantity:"1500 + 375 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_5"
        },
        uc_6:{
            quantity:"3000 + 1000 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_6"
        },
        uc_7:{
            quantity:"6000 + 2400 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_7"
        },
        uc_8:{
            quantity:"Royal Pass Upgrade Card (Season 14) + 70 UC",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_8"
        },
        uc_9: {
            quantity:"Elite Pass Plus Upgrade Card (Season 14) + Classic Create Coupon",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
            _id:"uc_9"
        }
    };

    const diamonds_value_with_amt = {
        diamonds_1: {
            quantity:"50 Diamonds",
            amount:64,
            service_charge: Math.floor(64 * 0.05),
            _id:"diamonds_1"
        },
        diamonds_2: {
            quantity:"100 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_2"
        },
        diamonds_3:{
            quantity:"310 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_3"
        },
        diamonds_4:{ 
            quantity:"520 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_4"
        },
        diamonds_5:{
            quantity:"1060 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_5"
        },
        diamonds_6:{
            quantity:"2180 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_6"
        },
        diamonds_7:{
            quantity:"5600 Diamonds",
            amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.70).toFixed(2),
            service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.70).toFixed(2) * 0.05).toFixed(2),
            _id:"diamonds_7"
        }
    };

    if(uc !== undefined) {
        const data = uc_value_with_amt[uc._id]
        return res.json({
            status:true,
            data: {
                amount:(Math.floor(data.amount) + Math.floor(data.service_charge)).toFixed(2),
                key:process.env.KHALTI_PUBLIC_KEY
            }
        });
    }else if(diamonds !== undefined) {
        const data = diamonds_value_with_amt[diamonds._id];
        return res.json({
            status:true,
            data:{
                amount:(Math.floor(data.amount) + Math.floor(data.service_charge)).toFixed(2),
                key:process.env.KHALTI_PUBLIC_KEY
            }
        });
    }

    return res.status(500).json({
        status:false,
        message:"Your request can't be process now !! Please try again later"
    });
};

exports.postStore = async (req, res, next) => {
    const {email, player_id,item} = req.body;
    console.log(req.body)
    
    // const verified = await khaltiVerification(req.body.token, match.fee);

    // if (!verified) {
    // //   return next(new AppError(verified.error, 400));
    //   return res.json({
    //       status:false,
    //       message:verified.error
    //   })
    // }

};