// const config = require('config');
// const loginHomepage = require('./routes/loginHomepage');
const homepage = require('./routes/homepage');
// const login = require('./routes/login');
// const signup = require('./routes/signup');
const registration = require('./routes/pubgForm');
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// if (!config.get('jwtPrivateKey' || 'jwtEmailVerification')) {
// console.log('FATAL ERROR: jwtPrivateKey is not defined');
// process.exit(1);
// }

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
mongoose.connect('mongodb://localhost/PUBG_NEPAL', {
        useNewUrlParser: true
    })
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));

// MIDDLEWARE FOR LOADING IMAGES AND STYLES
app.set('view engine', ejs);
app.use('/assets', express.static('assets'));
app.use('/styles', express.static('styles'));

// REQ IMPORTANT MIDDLEWARE
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(express.json());

// ROUTES
app.use('/', homepage);
// app.use('/signup', signup);
// app.use('/login', login);
app.use('/register', registration);
// app.use('/loginHomepage', loginHomepage);


// LISTENING PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on the port ${PORT}`);
});