exports.getLogin = (req, res, next) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "LOGIN",
  });
};

exports.getSignup = (req, res, next) => {
  return res.status(200).render("CreateORLogin.ejs", {
    title: "SIGN-UP",
  });
};
