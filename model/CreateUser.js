const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const moment = require('moment');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique:true
  },
  khaltiId: {
    type: Number,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  registerMatches: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "match",
    },
  ],
  totalMatch: {
    type: Number,
    default: 0,
  },
  matchWon: {
    type: Number,
    default: 0,
  },
  currentLeague: {
    type: String,
    enum:['Bronze', 'Gold', 'Diamond', 'Crown'],
    default: 'Bronze',
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

Schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name, currentLeague: this.currentLeague },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};

Schema.methods.isMatchFinished = function () {
  console.log(this);

  // // Yesterday date
  // let yesterday = moment().subtract(1, "days");
  // yesterday = moment(yesterday).format("YYYY-MM-DD")

  // // Current time
  // let now = moment().format('YYYY-MM-DD h:mm A')
  // let time = now.split(" ");
  // time = `${time[1]} ${time[2]}`;

  // // Current Time, Parsing it into valid format
  // let current_time = moment(time, 'hh:mm A');

  // // Now, I need to loop through user Registered match for getting "1 day before registered match": Since in 24 hr match is played and over
  // const filtered_match = matches.filter((el) => {
  //   return el.date === yesterday;
  // });

  // const updated_match = filtered_match.forEach((el) => {
  //   // Formatting the time (Because it's throwing error Unsupported format) Need to refactor this later

  //   // MATCH TIME
  //   let isoFormatDate = new Date(`${el.date} ${el.time}`);
  //   let date = moment(isoFormatDate).format('YYYY-MM-DD h:mm A');
  //   date = date.split(" ");
  //   let match_time = `${date[1]} ${date[2]}`;
  //   match_time = moment(match_time, 'hh:mm A');

  //   let result = current_time.isAfter(match_time);
  //   if (result) {
  //     // Remove that Match from Upcoming Matches
  //     console.log("Match has been played !!", result);

  //     // Update the Match Played Field of Dashboard
  //   } else {
  //     // Do Nothing
  //     console.log("Do Nothing !!", result);
  //   }
  // });

};

module.exports = mongoose.model("user", Schema);
