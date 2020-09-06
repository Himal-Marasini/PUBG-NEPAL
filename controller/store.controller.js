const Store = require("../model/store.model");

const khalti_store_verification = require("../services/khalti/store_verification");
const send_store_mail = require("../services/mail/store_mail");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/applicationError");

exports.getStore = (req, res, next) => {
  return res.render("store");
};

exports.postAuthShop = (req, res, next) => {
  const { uc, diamonds, dollarValue } = req.body;
  let nepaliOneDollarPrice = dollarValue;

  const uc_value_with_amt = {
    uc_1: {
      quantity: "30 + 2 UC",
      amount: (64).toFixed(2),
      service_charge: Math.floor(64 * 0.05).toFixed(2),
      _id: "uc_1"
    },
    uc_2: {
      quantity: "60 + 3 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_2"
    },
    uc_3: {
      quantity: "300 + 40 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_3"
    },
    uc_4: {
      quantity: "600 + 90 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_4"
    },
    uc_5: {
      quantity: "1500 + 375 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_5"
    },
    uc_6: {
      quantity: "3000 + 1000 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_6"
    },
    uc_7: {
      quantity: "6000 + 2400 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_7"
    },
    uc_8: {
      quantity: "Royal Pass Upgrade Card (Season 14) + 70 UC",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_8"
    },
    uc_9: {
      quantity: "Elite Pass Plus Upgrade Card (Season 14) + Classic Create Coupon",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
      _id: "uc_9"
    }
  };

  const diamonds_value_with_amt = {
    diamonds_1: {
      quantity: "50 Diamonds",
      amount: 64,
      service_charge: Math.floor(64 * 0.05),
      _id: "diamonds_1"
    },
    diamonds_2: {
      quantity: "100 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_2"
    },
    diamonds_3: {
      quantity: "310 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_3"
    },
    diamonds_4: {
      quantity: "520 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_4"
    },
    diamonds_5: {
      quantity: "1060 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_5"
    },
    diamonds_6: {
      quantity: "2180 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_6"
    },
    diamonds_7: {
      quantity: "5600 Diamonds",
      amount: Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.7).toFixed(2),
      service_charge: Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.7).toFixed(2) * 0.05).toFixed(2),
      _id: "diamonds_7"
    }
  };

  if (uc !== undefined) {
    const data = uc_value_with_amt[uc._id];
    return res.json({
      status: true,
      data: {
        amount: (parseFloat(data.amount) + parseFloat(data.service_charge)) * 100,
        key: process.env.KHALTI_PUBLIC_KEY
      }
    });
  } else if (diamonds !== undefined) {
    const data = diamonds_value_with_amt[diamonds._id];
    return res.json({
      status: true,
      data: {
        amount: (parseFloat(data.amount) + parseFloat(data.service_charge)) * 100,
        key: process.env.KHALTI_PUBLIC_KEY
      }
    });
  }
};

exports.postStore = catchAsync(async (req, res, next) => {
  const { email, id, dollarValue } = req.body;

  const verified = await khalti_store_verification(req.body.token, req.body.amount);

  if (!verified) {
    return next(new AppError(verified.error, 400));
  }

  const store = new Store({
    player_id: id,
    email: email,
    payment_details: {
      idx: verified.data.user.idx,
      name: verified.data.user.name,
      mobile: verified.data.user.mobile
    },
    item: {
      name: req.body.product_name,
      identity: req.body.product_identity,
      amount: req.body.amount / 100,
      dollarValue: Math.round(dollarValue).toFixed(2)
    }
  });

  const mailData = {
    buyer_email: store.email,
    buyer_playerId: store.player_id,
    item: store.item.name
  };

  await store.save();

  if (process.env.NODE_ENV === "prod") await send_store_mail(mailData);

  return res.json({
    status: true,
    message: "Your request has been made successfully made !! In 5 to 10 min, You will receive a confirmation mail"
  });
});
