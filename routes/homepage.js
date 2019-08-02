const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index', {
        sessionFlash: res.locals.sessionFlash
    });
    // console.log('THIS IS RES.LOCALS.SESSION FLASH');
    // console.log(res.locals.sessionFlash);

    // console.log('THIS IS RES.LOCALS');
    // console.log(res.locals);

    // console.log('THIS IS THE REQ.SESSION.SESSIONFLASH');
    // console.log(req.session.sessionFlash);

    // console.log('THIS IS THE REQ.SESSION');
    // console.log(req.session);

    // console.log(req.session.sessionFlash);
});

module.exports = Router;