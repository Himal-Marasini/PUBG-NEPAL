module.exports = async function (req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    next();
  }
  return res.redirect("/");
};
