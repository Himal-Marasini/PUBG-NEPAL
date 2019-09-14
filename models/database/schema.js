const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    registratorName: {
        type: String,
        require: true,
    },
    teamName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    payReceiveId: {
        type: String,
        require: true
    },
    matchType: {
        type: String,
        require: true
    },
    members: {
        type: Array,
        "default": [],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('usermobile', Schema);