
function ensureLoggedIn(req, res, next) {
    if(req.session.username) {
        return next()
    } else {
        res.redirect('/login');
    }
}

module.exports = ensureLoggedIn;