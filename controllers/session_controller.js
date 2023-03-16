const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

//getting login page
router.get('/login', (req, res) => {
    let message = 'Enter Your Details Here:';
    res.render('login', { message, });
})

//logging user in based off form results.
router.post('/sessions', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //check if user exists in users table.
    const sql = `select * from users where email = '${email}';`;

    pool.query(sql, (err, dbRes) => {
        console.log(dbRes.rows.length)
        if (dbRes.rows.length === 0) {
            let message = 'Incorrect Username or Password';
            res.render('login', { message, });
        } else {
            const user = dbRes.rows[0];
                bcrypt.compare(password, user.password_digest, (err, result) => {
                    if (err) console.log(err)
                    if(result) {
                        req.session.username = user.username;
                        res.redirect('/');
                    } else {
                        let message = 'incorrect password';
                        res.redirect('/login',);
                    }
            })
        }
    })
})

//logging user out
router.delete('/sessions', (req, res) => {
    req.session.destroy(() => {
        res.redirect('home');
    })
})

module.exports = router;

