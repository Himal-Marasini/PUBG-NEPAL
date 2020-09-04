const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facebook_page: {
        type: String,
        required: true
    },
    facebook_group: {
        type: String,
        required: true
    },
    discord: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    youtube_channel: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('social_media_link', Schema);