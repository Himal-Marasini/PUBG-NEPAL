const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
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
  prize: {
    type: String,
    required: true
  },
  fee: {
    type: String,
    required: true
  },
  players: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user"
    }
  ],
  device: {
    type: String,
    required: true,
    uppercase: true
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("match", Schema);
