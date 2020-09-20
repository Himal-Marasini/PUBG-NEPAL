const Match = require("../model/createMatch.model");
const User = require("../model/createUser.model");

const AppError = require("../util/applicationError");
const catchAsync = require("../util/catchAsync");
const sortMatches = require("../util/sortMatches");
const load_updated_ejs = require("../util/preventFromCaching");

// !LOGIN PAGE
async function NotAuthenticated_Page(req, res, next) {
  let match = await Match.find();

  // GET ALL THE MATCHES WHOSE STATUS IS NOT TRUE (MEANS MATCH IS NOT OVER)
  let existingMatch = match.filter(
    (el) => el.status.isFinished !== "true" && el.status.isFinished !== "technical error"
  );

  // SORT AND GROUP MATCHES ACCORDING TO DATE
  const newVal = sortMatches(existingMatch);

  return res.render("index", {
    matchInfo: newVal
  });
}

// LOGIN PAGE
async function Authenticated_Page(req, res, next) {
  const user = req.user;
  let match = [];
  let existingRegisteredMatches = [];

  if (user.registerMatches.length > 0)
    match = await User.findById(user._id).populate("registerMatches");

  // Filter the matches whose status is !== true; (Basically that is available)
  if (match.registerMatches !== undefined)
    existingRegisteredMatches = match.registerMatches.filter(
      (el) => el.status.isFinished !== "true" && el.status.isFinished !== "technical error"
    );

  user.isMatchFinished();

  const result = {
    name: user.name,
    matchPlayed: user.totalMatch,
    matchWon: user.matchWon,
    currentLeague: user.currentLeague,
    upcoming_matches: existingRegisteredMatches
  };

  // Show new file, Not From Browser Cache
  load_updated_ejs(res);

  return res.render("Login-Dashboard.ejs", {
    path: "/",
    data: result
  });
}

exports.getHomePage = catchAsync(async (req, res, next) => {
  const isLogin = req.isLoggedIn;
  if (!isLogin) {
    NotAuthenticated_Page(req, res, next);
  } else {
    Authenticated_Page(req, res, next);
  }
});

exports.getMatchHighlights = catchAsync(async (req, res) => {
  const match = await Match.find({ "status.isFinished": true });

  // SORT AND GROUP MATCHES ACCORDING TO DATE
  const data = sortMatches(match);

  load_updated_ejs(res);

  return res.render("Match-Highlights", {
    path: "/match-highlights",
    data: data
  });
});

exports.getTournaments = (req, res, next) => {
  load_updated_ejs(res);
  return res.render("Tournaments", {
    path: "/upcoming-tournament"
  });
};

exports.getRecentWinners = catchAsync(async (req, res, next) => {
  const match = await Match.find({ "status.isFinished": true });

  // SORT AND GROUP MATCHES ACCORDING TO DATE
  const data = sortMatches(match);

  load_updated_ejs(res);

  return res.render("RecentWinner", {
    path: "/recent-winner",
    data: data
  });
});

exports.getBlogs = (req, res, next) => {
  load_updated_ejs(res);
  return res.render("Update-Blogs", {
    path: "/blogs"
  });
};

exports.getContactUs = (req, res, next) => {
  load_updated_ejs(res);
  return res.render("ContactUs", {
    path: "/contact-us"
  });
};

exports.getUserSetting = (req, res, next) => {
  load_updated_ejs(res);
  return res.render("Setting", {
    path: "/user/setting",
    data: {
      name: req.user.name,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      khaltiId: req.user.khaltiId
    }
  });
};
