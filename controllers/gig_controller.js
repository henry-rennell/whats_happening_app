const express = require('express');
const router = express.Router();
const pool = require('../db');
const isLoggedIn = require('./../middlewares/ensureLoggedIn');

//getting every gig for homepage
router.get('/', (req, res) => {
    if (res.locals.currentUser.location) {
        const sql = `select * from gigs where city ilike '${res.locals.currentUser.location}' order by gig_id desc;`;
        pool.query(sql, (err, dbRes) => {
            if (err) console.log(err)
            const gigs = dbRes.rows;
            const location = res.locals.currentUser.location;
            res.render('home_signed_in', { gigs, location, });
        })    
    } else {
        const sql = `select * from gigs order by gig_id desc;`;
        pool.query(sql, (err, dbRes) => {
            if (err) console.log(err)
            const gigs = dbRes.rows;

            res.render('home', { gigs, });
        })  
    }  
})



router.use(isLoggedIn);

//rendering new gig form
router.get('/gigs/new', (req, res) => {
    res.render('new_gig');
})

//getting specific gig for gig details page
router.get('/gigs/:gig_id', (req, res) => {
    // res.locals.currentUser
    const sql = `select * from gigs where gig_id = ${req.params.gig_id}`;

    pool.query(sql, (err, dbRes) => {
        if (err) console.log(err);

        const gig = dbRes.rows[0];

        res.render('gig', { gig, })
    })

})

//adding new gig
router.post('/gigs', (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const description = req.body.description;
    const keywords = req.body.keywords;
    const posted_by = req.body.posted_by;
    const city = req.body.city;
    const image_url = req.body.image_url;
    const address = req.body.address;
    const date = req.body.date;

    const sql = `insert into gigs (title, description, keywords, posted_by, city, image_url, address, artist, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool.query(sql, [title, description, keywords, posted_by, city, image_url, address, artist, date], (err, dbRes) => {
        if (err) {
            console.log(err);
        }
    })
    res.redirect(`/`);
})

//rendering update gig form.
router.get('/gigs/:gig_id/edit', (req, res) => {
    const sql = `select * from gigs where gig_id = ${req.params.gig_id};`;
    pool.query(sql, (err, dbRes) => {
        let gig = dbRes.rows[0];
        res.render('update_gig', { gig, });
    })
})

router.put('/gigs', (req, res) => {
    const sql = `update gigs set title = $1, description = $2, keywords = $3, city = $4, image_url = $5, address = $6 where gig_id = $7, date = $8;`;
    pool.query(sql, [req.body.title, req.body.description, req.body.keywords, req.body.city, req.body.image_url, req.body.address, req.body.gig_id, req.body.date], (err, dbRes) => {
        if (err) console.log(err);
        res.redirect(`/gigs/${req.body.gig_id}`);
    })
})

router.delete('/gigs/:gig_id', (req, res) => {
     let sql = `delete from gigs where gig_id = '${req.params.gig_id}';`
     
     pool.query(sql, (err, dbRes) => {
        if(err) console.log(err)
        res.redirect('/');
     })
})



module.exports = router;
