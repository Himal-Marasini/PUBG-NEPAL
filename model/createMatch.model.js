const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user"
  },
  email: {
    type: String
  },
  team_name: {
    type: String
  },
  team_members: {
    type: Array
  },
  khaltiDetail: {
    type: Object
  }
});

const winnerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  team_name: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    default: []
  }
});

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
    prize: {
      type: String,
      required: true
    },
    fee: {
      type: String,
      required: true
    },
    players: [playerSchema],
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
      },
      winners: {
        first_winner: {
          user_id: {
            type: String,
            default: null
          },
          team_name: {
            type: String,
            default: null
          },
          members: {
            type: Array,
            default: []
          }
        },
        second_winner: {
          user_id: {
            type: String,
            default: null
          },
          team_name: {
            type: String,
            default: null
          },
          members: {
            type: Array,
            default: []
          }
        },
        third_winner: {
          user_id: {
            type: String,
            default: null
          },
          team_name: {
            type: String,
            default: null
          },
          members: {
            type: Array,
            default: []
          }
        },
        highest_team_kill_winner: {
          user_id: {
            type: String,
            default: null
          },
          team_name: {
            type: String,
            default: null
          },
          members: {
            type: Array,
            default: []
          }
        }
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
    },
    minimize: false
  }
);

Schema.methods.updateWinner = async function (winners, winner_position) {
  this.status.winners[winner_position].user_id = winners.user_id;
  this.status.winners[winner_position].team_name = winners.team_name;
  this.status.winners[winner_position].members = [
    { name: winners.members[0].name, id: winners.members[0].id },
    { name: winners.members[1].name, id: winners.members[1].id },
    { name: winners.members[2].name, id: winners.members[2].id },
    { name: winners.members[3].name, id: winners.members[3].id }
  ];
  await this.save();
};

module.exports = mongoose.model("match", Schema);
