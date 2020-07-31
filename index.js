// In Package.json, Change the start script from "Nodemon index.js" to "Node index.js"

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const homepage = require('./Routes/homepage');
const authentication = require('./Routes/authentication');
const registration = require('./Routes/pubgForm');
const admin = require('./Routes/admin');

const db = require('./Util/databse');

const error = require('./Controllers/error');

app.use(morgan('dev'));

if (process.env.development === "prod") {
  // app.use(cors());
  // app.options('*', cors());
}

app.use(helmet());

const limit = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 100,
  message: "Too many request from same IP, Please try again after ten minutes !!!"
});

app.use(limit);

app.use(compression());

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

// app.use('trust proxy');

// if (process.env.development === "prod") {
//     app.get("*", function (req, res) {
//         res.redirect("https://" + req.headers.host + res.url);
//     });
// }

// Routes
app.use(homepage);
// app.use(authentication);
app.use(admin);
app.use(registration);

app.all("*", function (req, res, next) {
  const err = new Error("404 !!! PAGE NOT FOUND");
  err.type = "Page Not Found";
  err.status = 404;
  err.subtitle = `THE PAGE YOU ARE LOOKING FOR https://pubgmobilenp.com${req.originalUrl} DOESN'T EXISTS !!`
  next(err);
});

app.use(error);

db.then(() => {
  const server = app.listen(process.env.PORT);
  console.log(`Server is running at PORT ${process.env.PORT}`);
  process.on("SIGTERM", () => {
    console.log("SIGTERM !!!! SHUTTING DOWN SERVER");
    server.close(() => {
      console.log('Process Terminate !!')
    })
  });
}).catch(err => {
  console.error(err);
  return res.status(500).render('error.ejs', {
    status: false,
    errorType: "Server Down",
    message: {
      title: '500 !!! INTERNAL SERVER ERROR',
      subtitle: `PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG.`
    }
  });
});