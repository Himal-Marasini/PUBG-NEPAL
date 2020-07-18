// In Package.json, Change the start script from "Nodemon index.js" to "Node index.js"

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyparser = require('body-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });


// Importing Routes
const homepage = require('./routes/homepage');
const authentication = require('./routes/authentication');
const registration = require('./routes/pubgForm');
const admin = require('./routes/admin');


// Utility Functions
const db = require('./util/databse');

const error = require('./controllers/error');


app.set('view engine', 'ejs');

// Middleware for Image and css
app.use('/assets', express.static('assets'));
app.use('/styles', express.static('styles'));

// Bodyparser - FOR PARSING FORM
app.use(bodyparser.urlencoded({
    extended: false
}));

// BODYPARSER - FOR JSON BODY
app.use(bodyparser.json());

// // EXPRESSION SESSION
// app.use(expressValidator());
// app.use(expressSession({
//     secret: process.env.SESSION_KEY,
//     resave: false,
//     saveUninitialized: false
// }));

app.use(flash());

// Routes
app.use(homepage);
// app.use(authentication);
app.use(admin);
app.use(registration);
app.use(error);

db.then(() => {
    app.listen(process.env.PORT);
}).catch(err => {
    console.error(err);
});