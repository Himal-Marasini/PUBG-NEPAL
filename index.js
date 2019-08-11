const db = require('./util/database');

const error = require('./controllers/error');

const homepage = require('./routes/homepage');

const registration = require('./routes/pubgForm');

const express = require('express');

const app = express();

const ejs = require('ejs');
const bodyparser = require('body-parser');

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

// ROUTES
app.use('/', homepage);
app.use('/register', registration);
app.use(error);