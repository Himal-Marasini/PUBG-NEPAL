const Match = require("../Model/CreateMatch");
const moment = require("moment");
const _ = require("lodash");

exports.getHomePage = async (req, res) => {
  const isLogin = false;
  if (!isLogin) {
    try {
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
    } catch (error) {
      console.error(error);
      const err = new Error("500 !!! INTERNAL SERVER ERROR");
      err.type = "Server Down";
      err.status = 500;
      err.subtitle =
        "PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG.";
      next(err);
    }
  } else {
    return res.render("Login-Dashboard.ejs", {
      path: "/"
    });
  }
};

exports.getMatchHighlights = (req, res) => {
  return res.render('MatchHighlights.ejs', {
    path: "/match-highlights"
  });
}
// function NotAuthenticated_Page(req,res){

// };

// function Authenticated_Page(req,res){

// }
