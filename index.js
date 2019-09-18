const db = require('./util/databse');

const error = require('./controllers/error');

const homepage = require('./routes/homepage');
const registration = require('./routes/pubgForm');

const express = require('express');

const app = express();

const ejs = require('ejs');
const bodyparser = require('body-parser');

const expressSession = require('express-session');
const expressValidator = require('express-validator');

db.then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`listening on the port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
});

// MIDDLEWARE FOR LOADING IMAGES AND STYLES
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/styles', express.static('styles'));

// REQ IMPORTANT MIDDLEWARE
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());

// EXPRESSION SESSION
app.use(expressValidator());
app.use(expressSession({
    secret: "Pubg-Nepal-18",
    cookie: {
        maxAge: 60 * 10
    },
    saveUninitialized: true,
    resave: true
}));


// ROUTES
app.use('/', homepage);
app.use('/register', registration);
app.use(error);