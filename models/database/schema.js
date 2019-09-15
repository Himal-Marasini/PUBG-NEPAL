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
    emailId: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    khaltiId: {
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
    khaltiDetail: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

exports.userMobile = mongoose.model('userMobile', Schema);
exports.userEmulator = mongoose.model('userEmulator', Schema);