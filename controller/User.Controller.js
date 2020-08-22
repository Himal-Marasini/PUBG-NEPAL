const moment = require("moment");
const _ = require("lodash");

const Match = require("../model/createMatch");
const User = require("../model/createUser");

const AppError = require('../util/applicationError');
const catchAsync = require('../util/catchAsync');

exports.getHomePage = catchAsync(async (req, res, next) => {
  const isLogin = true;
  if (!isLogin) {
    let match = await Match.find();

    match.sort(function (a, b) {
      return a.date > b.date ? -1 : 1;
    });

    let date = function (d) {
      return moment(new Date(d.date)).format("DD-MM-YYYY");
    };

    let groupDate = function (group, date) {
      return {
        date: date,
        match: group,
      };
    };

    const newVal = _(match).groupBy(date).map(groupDate).value();

    return res.render("index", {
      matchInfo: newVal,
    });
  } else {
    const user = await User.findById('5f237852c2bf6c189ddd42ad'); // For Development Testing
    // const user = await User.findById('5f243f5dba22cd0017cdce01'); // For Production Testing
    if (!user) {
      next(new AppError("No user exists !!!", 404));
    }

    user.isMatchFinished()

    return res.render("Login-Dashboard.ejs", {
      path: "/",
    });
  }
});

exports.getMatchHighlights = catchAsync(async (req, res) => {
  return res.render('Match-Highlights', {
    path: "/match-highlights"
  });
});

exports.getTournaments = (req, res, next) => {
  return res.render('Tournaments', {
    path: '/upcoming-tournament'
  });
};

exports.getRecentWinners = (req, res, next) => {
  return res.render('RecentWinner', {
    path: "/recent-winner"
  });
};

// function NotAuthenticated_Page(req,res){

// };

// function Authenticated_Page(req,res){

// }
