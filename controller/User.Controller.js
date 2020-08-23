const moment = require("moment");
const _ = require("lodash");

const Match = require("../model/createMatch");
const User = require("../model/createUser");

const AppError = require('../util/applicationError');
const catchAsync = require('../util/catchAsync');


// !LOGIN PAGE
async function NotAuthenticated_Page(req, res, next) {
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
};

// LOGIN PAGE
async function Authenticated_Page(req, res, next) {
  const user = req.user;
  let match = [];

  if (user.registerMatches.length > 0) match = await User.findById(user._id).populate('registerMatches');



  // user.isMatchFinished()

  const userObj = {
    matchPlayed: user.totalMatch,
    matchWon: user.matchWon,
    currentLeague: user.currentLeague,
    recentMatches: match
  };

  return res.render("Login-Dashboard.ejs", {
    path: "/",
    data: userObj
  });
}

exports.getHomePage = catchAsync(async (req, res, next) => {
  const isLogin = req.isLoggedIn;
  if (!isLogin) {
    NotAuthenticated_Page(req, res, next)
  } else {
    Authenticated_Page(req, res, next)
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

