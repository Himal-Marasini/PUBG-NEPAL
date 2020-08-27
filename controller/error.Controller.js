const AppError = require('../util/applicationError');

function handleObjectIdError(err) {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

function handleDuplicateDataError(err) {
    let message = "";
    if (err.keyPattern.phoneNumber === 1) {
        message = `Phone Number already added on different account`;
    } else if (err.keyPattern.khaltiId === 1) {
        message = `Khalti Id already added on different account`;
    }
    return new AppError(message, 400)
};

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
};

function sendErrorProd(err, res) {
    // Operation are TRUSTED ERROR : SEND MESSAGE TO CLIENT
    // Example(USER NOT FOUND, INVALID PASSWORD)
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message
        });

        // Programming or other unknown error: Don't leak details (INTERNAL SERVER ERROR);
    } else {
        //  1.) Log Error For Developer
        console.log("============================================================================================================================================================");
        console.log("================================================== SERIOUS ERROR ===========================================================================================");
        console.log("============================================================================================================================================================");
        console.error(err);
        console.log("============================================================================================================================================================");
        console.log("====================================================== END ERROR ============================================================================================");
        console.log("============================================================================================================================================================");

        // 2.) Send generic message
        return res.status(500).json({
            success: false,
            message: 'Something went very wrong !! (Internal Server Error)'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'prod') {
        let error = { ...err };

        // Handles the INVALID OBJECT ID OF MONGOOSE
        if (error.kind === "ObjectId") error = handleObjectIdError(error);
        // Handles the DUPLICATE KEY OF MONGOOSE (UNIQUE OF MONGOOSE THROWS ERROR VALIDATION IF DATA IS NOT UNIQUE)
        if (error.name === "MongoError") error = handleDuplicateDataError(error);
        if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError(error);
        sendErrorProd(error, res);
    }
};