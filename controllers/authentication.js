exports.getLogin = (req, res, next) => {
    return res.status(200).render('authorization', {
        title: 'LOGIN'
    });
};

exports.getSignup = (req, res, next) => {
    return res.status(200).render('authorization', {
        title: 'SIGN-UP'
    });
};