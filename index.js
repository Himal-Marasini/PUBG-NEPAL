// In Package.json, Change the start script from "Nodemon index.js" to "Node index.js"

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

// Security Package
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');



// Importing Routes
const homepage = require('./routes/homepage');
const authentication = require('./routes/authentication');
const registration = require('./routes/pubgForm');
const admin = require('./routes/admin');


// Utility Functions
const db = require('./util/databse');

const error = require('./controllers/error');


app.use(helmet());

const limit = rateLimit({
    max: 70,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from same IP, Please try again after one hour !!!"
});

app.use(limit);

app.set('view engine', 'ejs');

// Middleware for Image and css
app.use('/assets', express.static('assets'));
app.use('/styles', express.static('styles'));

// Bodyparser - FOR PARSING FORM
app.use(bodyparser.urlencoded({
    limit: "1mb",
    extended: false
}));

// BODYPARSER - FOR JSON BODY
app.use(bodyparser.json({
    limit: "1mb"
}));

app.use(mongoSanitize());

app.use(xss());


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