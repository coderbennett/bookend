const withAuth = (req, res, next) => {
    if(!req.session.LoggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;