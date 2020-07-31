const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = new mongoose.Schema({
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
        required: true
    },
    khaltiId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    registerMatches: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'match'
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
        default: "Gold"
    }
});

Schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, name: this.name, currentLeague: this.currentLeague }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

module.exports = mongoose.model("user", Schema)
