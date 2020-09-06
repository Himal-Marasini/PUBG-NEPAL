const AppError = require("../util/applicationError");

function handleObjectIdError(err) {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

function handleDuplicateDataError(err) {
  let message = "";
  if (err.keyPattern.phoneNumber === 1) {
    message = `User already exists with this Phone Number !!`;
  } else if (err.keyPattern.khaltiId === 1) {
    message = `User already exists with this khalti id !!`;
  }
  return new AppError(message, 400);
}

function handleJsonWebTokenError(err) {
  return new AppError("Invalid Token !! Please login again", 401);
}

function sendErrorDev(err, res) {
  return res.status(err.statusCode).json({
    success: err.success,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

function sendErrorProd(err, req, res) {
  // Operation are TRUSTED ERROR : SEND MESSAGE TO CLIENT

  // Example(USER NOT FOUND, INVALID PASSWORD)
  if (err.isOperational) {
    // 404 PAGE NOT FOUND
    if (err.statusCode === 404) {
      return res.render("error.ejs", {
        message: {
          title: "404 !! Page Error",
          subtitle: `The page you are looking for https://localhost:3000${req.originalUrl}, for any queries contact us on facebook: https://www.facebook.com/pubgmobilefornepal`
        },
        errorType: "Page not found !!"
      });
    }

    // 500 USING FOR RESET EMAIL TOKEN EXPIRED
    if (err.statusCode === 500) {
      return res.status(500).render("error", {
        errorType: "INTERNAL SERVER ERROR !!",
        message: {
          title: "RESET EMAIL IS NOT VALID ANYMORE (Session has been expired)",
          subtitle:
            "PLEASE TRY AGAIN TO RESET YOUR PASSWORD !! OR CONTACT US FOR HELP: https://www.facebook.com/pubgmobilefornepal"
        }
      });
    }

    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message
    });

    // Programming or other unknown error: Don't leak details (INTERNAL SERVER ERROR);
  } else {
    //  1.) Log Error For Developer
    console.log(
      "============================================================================================================================================================"
    );
    console.log(
      "================================================== SERIOUS ERROR ==========================================================================================="
    );
    console.log(
      "============================================================================================================================================================"
    );
    console.error(err);
    console.log(
      "============================================================================================================================================================"
    );
    console.log(
      "====================================================== END ERROR ============================================================================================"
    );
    console.log(
      "============================================================================================================================================================"
    );

    // 2.) Send generic message

    // This will work on REST API, DON'T REMOVE THIS CODE
    // return res.status(500).json({
    //     success: false,
    //     message: 'Something went very wrong !! (Internal Server Error)'
    // });

    return res.status(500).render("error", {
      errorType: "INTERNAL SERVER ERROR !!",
      message: {
        title: "500 !! INTERNAL SERVER ERROR",
        subtitle:
          "WE DIDN'T EXPECT THIS TAKING TOO LONG. TRY AGAIN LATER OR CONTACT US: https://www.facebook.com/pubgmobilefornepal"
      }
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = { ...err };

    // Handles the INVALID OBJECT ID OF MONGOOSE
    if (error.kind === "ObjectId") error = handleObjectIdError(error);
    // Handles the DUPLICATE KEY OF MONGOOSE (UNIQUE OF MONGOOSE THROWS ERROR VALIDATION IF DATA IS NOT UNIQUE)
    if (error.name === "MongoError") error = handleDuplicateDataError(error);
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError(error);
    sendErrorProd(err, req, res);
  }
};
