const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true
    },
    khaltiId: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    registerMatches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "match"
      }
    ],
    totalMatch: {
      type: Number,
      default: 0
    },
    matchWon: {
      type: Number,
      default: 0
    },
    currentLeague: {
      type: String,
      enum: ["Bronze", "Gold", "Diamond", "Crown"],
      default: "Bronze"
    },
    redeemPoints: {
      type: Number,
      default: 0
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

Schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name, currentLeague: this.currentLeague },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
  return token;
};

Schema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// In this function, We generate the reset token
Schema.methods.createPasswordResetToken = function () {
  // 1. Generate a random string
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Check if Token already exists or hasn't been expired yet
  if (this.passwordResetExpires !== undefined) {
    if (this.passwordResetExpires > Date.now()) {
      return null;
    }
  }

  // 2. Store the hashed string on DB so that hacked won't get access to reset token
  // This will be hashed token and Will be stored in db, If even hacker get access to token, He won't be able to change the password because
  // we will send the normal hex random token (i.e resetToken) at front end.
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 3. Expires the token in 10 Mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // 4. At the end, Return the token
  return resetToken;
};

Schema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimeStamp;
  }

  // False means not changed
  return false;
};

Schema.methods.isMatchFinished = function () {
  // console.log(this);
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
