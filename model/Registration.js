const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    registratorName: {
      type: String,
      required: true
    },
    teamName: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    khaltiId: {
      type: String,
      required: true
    },
    matchType: {
      type: String,
      required: true
    },
    members: {
      type: Array,
      required: true
    },
    khaltiDetail: {
      type: Object,
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

module.exports = mongoose.model("user", Schema);
