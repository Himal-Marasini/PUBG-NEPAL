const express = require('express');
const Router = express.Router();

const Match = require('../Model/CreateMatch');
const moment = require('moment');
const _ = require('lodash');

Router.get('/', async (req, res, next) => {
    try {
        let match = await Match.find();

        match.sort(function (a, b) {
            return a.date > b.date ? -1 : 1;
        });

        let date = function (d) {
            return moment(new Date(d.date)).format('DD-MM-YYYY')
        }

        let groupDate = function (group, date) {
            return {
                date: date,
                match: group
            }
        }

        const newVal = _(match).groupBy(date).map(groupDate).value();


        return res.render('index', {
            matchInfo: newVal
        });
    } catch (error) {
        console.error(error);
        const err = new Error("500 !!! INTERNAL SERVER ERROR");
        err.type = "Server Down";
        err.status = 500;
        err.subtitle = "PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG."
        next(err);
    }
});

module.exports = Router;