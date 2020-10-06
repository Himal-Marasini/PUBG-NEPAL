const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      uppercase: true
    },
    map: {
      type: String,
      required: true,
      uppercase: true
    },
    players: [
      {
        user_id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "user"
        },
        player_name: {
          type: String,
          required: true
        },
        player_id: {
          type: String,
          required: true
        }
      }
    ],
    device: {
      type: String,
      required: true,
      uppercase: true
    },
    status: {
      isFinished: {
        type: String,
        enum: ["technical error", "registration closed", "match finished", "registration opened"],
        // technical error = match has been cancelled from admin of PUBG MOBILE NEPAL,
        // registration closed = match registration has been closed
        // true = match has been finished and played succesfull
        // false = registration opened
        default: "registration opened"
      }
    },
    highlights: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

module.exports = mongoose.model("free_matches", Schema);
