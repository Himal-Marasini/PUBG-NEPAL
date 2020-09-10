const express = require("express");
const Router = express.Router();

const Match = require("../model/CreateMatch");
const moment = require("moment");
const _ = require("lodash");

Router.get("/", async (req, res, next) => {
  let match = await Match.find();

  // GET ALL THE MATCHES WHOSE STATUS IS NOT TRUE (MEANS MATCH IS NOT OVER)
  let paidMatch = match.filter((el) => el.isFinished == false && el.isFree == false);
  let freeMatch = match.filter((el) => el.isFinished == false && el.isFree == true);

  paidMatch.sort(function (a, b) {
    return a.date < b.date ? -1 : 1;
  });

  freeMatch.sort(function (a, b) {
    return a.date < b.date ? -1 : 1;
  });

  let date = function (d) {
    return moment(new Date(d.date)).format("DD-MM-YYYY");
  };

  let groupDate = function (group, date) {
    return {
      date: date,
      match: group
    };
  };

  const paidUpcomingMatches = _(paidMatch).groupBy(date).map(groupDate).value();
  const freeUpcomingMatches = _(freeMatch).groupBy(date).map(groupDate).value();

  return res.render("index", {
    paidMatch: paidUpcomingMatches,
    freeMatch: freeUpcomingMatches
  });
});

module.exports = Router;
