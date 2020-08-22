const AppError = require('../util/applicationError');

function handleObjectIdError(err) {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

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
            status: err.success,
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
        // Handles the OBJECT ID
        if (error.kind === "ObjectId") error = handleObjectIdError(error);
        sendErrorProd(error, res);
    }

    // return res.status(err.status).render('error.ejs', {
    //     status: false,
    //     errorType: err.type,
    //     message: {
    //         title: err,
    //         subtitle: err.subtitle
    //     }
    // });
};