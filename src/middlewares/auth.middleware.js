exports.isLoggedIn = (req, res, next) => {
    if (res.locals.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};
