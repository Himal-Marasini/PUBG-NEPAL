const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    player_id: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    payment_details: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    admin_payment_status: {
      type: String,
      enum: ["complete", "pending"],
      default: "pending"
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

module.exports = mongoose.model("store", Schema);
