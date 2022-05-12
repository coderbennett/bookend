const withAuth = (req, res, next) => {
    if(!req.session.loggedIn) {
        res.json().redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;