const moment = require("moment");
const _ = require("lodash");

module.exports = (match) => {
  match.sort(function (a, b) {
    return a.date > b.date ? -1 : 1;
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

  return _(match).groupBy(date).map(groupDate).value();
};
