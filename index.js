const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const flash = require("connect-flash");
const session = require("express-session");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const user = require("./routes/user.route");
const authentication = require("./routes/authentication.route");
const matchRegistration = require("./routes/matchRegistration.route");
const store = require("./routes/store.route");
// const demo = require("./routes/demo.route");

const AppError = require("./util/applicationError");
const db = require("./util/databse");

const errorGlobalHandler = require("./controller/error.controller");

app.use(morgan("dev"));

app.use(helmet());

// const limit = rateLimit({
//   max: 70,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many request from same IP, Please try again after one hour !!!"
// });

// app.use(limit);

app.use(compression());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// Middleware for Image and css
app.use("/assets", express.static("assets"));
app.use("/styles", express.static("styles"));

// Bodyparser - FOR PARSING FORM
app.use(
  bodyparser.urlencoded({
    limit: "1mb",
    extended: false
  })
);

// BODYPARSER - FOR JSON BODY
app.use(
  bodyparser.json({
    limit: "1mb"
  })
);

app.use(cookieParser());
app.use(mongoSanitize());

app.use(xss());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());

app.get("/favico.ico", (req, res) => {
  res.sendStatus(404);
});

// Routes
app.use(authentication);
app.use(user);
app.use(matchRegistration);
app.use(store);
// app.use(demo);

// 404, Page not found
app.all("*", function (req, res, next) {
  next(
    new AppError(
      `CAN'T FIND THE PAGE YOU ARE LOOKING FOR https://pubgmobilenp.com${req.originalUrl} ON THIS SERVER !!`,
      404
    )
  );
});

app.use(errorGlobalHandler);

db.then(() => {
  const server = app.listen(process.env.PORT);
  console.log(`Server is running at PORT ${process.env.PORT}`);

  // Event Listener on SIGTERM
  process.on("SIGTERM", () => {
    console.log("SIGTERM !!!! SHUTTING DOWN SERVER");
    server.close(() => {
      console.log("Process Terminate !!");
    });
  });

  // Event Listener on UNHANDLER REJECTION [will work when database is not getting connected]

  // process.on("unhandledRejection", (err) => {
  //   console.log(err.name, err.message);
  //   console.log("Unhandled Rejection !!");
  // server.close(() => {
  //   process.exit(1);
  // });

  // });
}).catch((err) => {
  console.error(err);
  // new AppError("PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG.", 500);
  return res.status(500).render("error.ejs", {
    success: false,
    errorType: "Server Down",
    message: {
      title: "500 !!! INTERNAL SERVER ERROR",
      subtitle: `PLEASE TRY AGAIN LATER, WE DIDN'T ANTICIPATE THIS TAKING SO LONG.`
    }
  });
});
