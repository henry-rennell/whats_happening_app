function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if(req.session.username) {
            return true
        } else {
            return false
        }
    }
    next();
}

module.exports = viewHelpers;