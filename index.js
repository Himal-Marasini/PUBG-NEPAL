const session = require('express-session');
const flash = require('connect-flash');
const {
    khalti
} = require('./routes/khalti');
const axios = require('./middleware/khaltiServer');
const homepage = require('./routes/homepage');
const registration = require('./routes/pubgForm');
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
mongoose.connect('mongodb://localhost/pubgNepal', {
        useNewUrlParser: true
    })
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));

// MIDDLEWARE FOR LOADING IMAGES AND STYLES
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/styles', express.static('styles'));

// REQ IMPORTANT MIDDLEWARE
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// EXPRESS SESSION MIDDLEWATE
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// EXPRESS MESSAGES MIDDLEWARE
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = req.session.messages;
    delete req.session.messages;
    next();
});


// ROUTES
app.use('/', homepage);
app.use('/register', registration);
app.use('/register/khalti', khalti);


// LISTENING PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on the port ${PORT}`);
});