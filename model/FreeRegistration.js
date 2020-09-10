const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true
    },
    matchType: {
      type: String,
      required: true
    },
    player_name: {
      type: String,
      required: true
    },
    player_id: {
      type: String,
      required: true
    },
    matchId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "match",
      required: true
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

module.exports = mongoose.model("freeRegistration", Schema);
