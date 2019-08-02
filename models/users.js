const config = require('config');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 30
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        username: this.username
    }, config.get('jwtPrivateKey'));
    console.log(token);
    return token;
};

const User = mongoose.model('User', schema);

function validate(object) {
    const objectSchema = {
        username: joi.string().max(20).min(4).required(),
        email: joi.string().email().required(),
        phoneNumber: joi.number().required(),
        password: joi.string().min(6).max(100).required()
    };
    return joi.validate(object, objectSchema);
}

exports.User = User;
exports.validate = validate;