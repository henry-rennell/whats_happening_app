const pool = require('../db');

function setCurrentUser(req, res, next) {
    const username  = req.session.username;
    res.locals.currentUser = {};
    if(username) {
        const sql = `select id, username, user_name, location from users where username = '${username}';`;
        pool.query(sql, (err, dbRes) => {
            if (err) {
                console.log(err);
            } else {
                res.locals.currentUser = dbRes.rows[0];
                next();
            }
        })
    } else {
        next();
    }
}

module.exports = setCurrentUser;