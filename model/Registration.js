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
        required: true
    },
    khaltiDetail: {
        type: Object,
        require: true
    },
    matchId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "match",
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

module.exports = mongoose.model('registeredMatch', Schema);