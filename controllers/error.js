module.exports = (req, res, next) => {
    return res.status(404).render('error.ejs', {
        status: true,
        errorType: "Page not found",
        message: {
            title: '404 !!! PAGE NOT FOUND',
            subtitle: `THIS IS NOT THE WEBPAGE YOU ARE LOOKING FOR !!`
        }
    });
};