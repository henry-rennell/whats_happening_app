const express = require('express');
const router = express.Router();
const pool = require('../db');

// searching for gigs based off search form
// router.post('/search', (req, res) => {
//     res.redirect(`/search/${req.body.searchType}/${req.body.searched}`)
// })



router.get('/search', (req, res) => {
const sql = `select * from gigs where ${req.query.searchType} ilike '${req.query.searched}';`;
const searched = req.query.searched;
pool.query(sql, (err, dbRes) => {
    const gigs = dbRes.rows;
    console.log(dbRes);
    res.render('search_results', {gigs, searched,});
})
})

module.exports = router;
