module.exports = (err, req, res, next) => {
    console.error(err)
    return res.status(err.status).render('error.ejs', {
        status: false,
        errorType: err.type,
        message: {
            title: err,
            subtitle: err.subtitle
        }
    });
};