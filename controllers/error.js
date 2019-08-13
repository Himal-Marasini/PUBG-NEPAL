module.exports = (req, res, next) => {
    return res.status(404).send(`<h1>Page has not been found !!`);
};