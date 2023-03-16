const { Pool } = require('pg');
const pool = new Pool({
    database: 'whats_happening_app',
});

let sqlCheck = `create table if not exists gigs (
    gig_id serial primary key,
    title text,
    description text,
    keywords text,
    posted_by text,
    city text,
    image_url text,
    address text,
    artist text,
    date text 
);
`;

let sqlAddUsers = `create table if not exists users (
    id serial primary key,
    email text unique,
    username text unique,
    password_digest text,
    location text
);
`;

// pool.query(sqlAddUsers, (err, dbRes) => {
//     let sql = `insert into users (email, username, password_digest, location) values ($1, $2, $3, $4);`
//     pool.query(sql, ['henryrennell@gmail.com', 'Henry Rennell', '$2b$10$ssdN1qMmEKHrgbfjst1ixOSVu3eSmK86/zdi7t.VZ3K3dn5Mh4.WO', 'Melbourne'], (err, dbRes) => {
//         if (err) console.log(err)
//     })
// })



const bandNames =   [  'Funky Beats',  'Hypnotic Echoes',  'Garage Explorers',  'Electric Vibes',  'Psychedelic Rays',  'Soulful Storm',  'Indie Echo',  'Bluesy Chaos',  'Experimental Harmony',  'Trippy Machine',  'Alternative Riot',  'Jazzy Gurus',  'Pop Haze',  'Metal Lords',  'Country Rebels',  'Groovy Jam',  'Punk Echo',  'Riders Machine',  'Folk Storm',  'Hypnotic Chaos'];

const titles = [  'Infinite Grooves',  'Electric Odyssey',  'Sonic Boom',  'Jazz Fusion Frenzy',  'The Psychedelic Circus',  'Funky Fiesta',  'Rock n Roll Revival',  'Rhythm and Blues Revue',  'Metal Mayhem',  'Pop Sensation',  'Country Hoedown',  'Folk Tales',  'Indie Showcase',  'Garage Rock Riot',  'Punk Power Hour',  'Acoustic Hourglass',  'Experimental Excursion',  'Alternative Avenue',  'Jam Session Jamboree',  'Vibes and Melodies'];

const cities = ['Melbourne', 'Sydney'];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const images = [
    'https://cdn-asia.uniteasia.org/uploads/2019/01/06ca94ba-primitiv-1024x683.jpg',
    'https://e3.365dm.com/21/08/1600x900/skynews-band-on-stage-live-music-gig_5483115.jpg?20210818211423',
    'https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=831&h=554&crop=1',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/The_Cure_Live_in_Singapore_2-_1st_August_2007.jpg/1200px-The_Cure_Live_in_Singapore_2-_1st_August_2007.jpg',
    'https://i0.wp.com/dailyyonder.com/wp-content/uploads/2021/08/rich-mattson-northstars-2020.jpg?fit=1200%2C675',
    'https://media.pitchfork.com/photos/6298211bf8426c92b14abf66/2:1/w_1200',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Isis_performing_live_at_the_Great_American_Music_Hall_in_San_Francisco--June_29%2C_2009.jpg/640px-Isis_performing_live_at_the_Great_American_Music_Hall_in_San_Francisco--June_29%2C_2009.jpg'
  ];

  const keywords = ['Rock', 'Pop', 'Hip-hop', 'Jazz', 'Electronic'];

  const address = '123 Sample Street';

pool.query(sqlCheck, (err, dbRes) => {
    for (let count = 0; count < 10; count++) {
        let sql = `insert into gigs (title, image_url, city, artist, address, description, keywords, date) values ($1, $2, $3, $4, $5, $6, $7, $8);`;

        pool.query(sql, [titles[Math.floor(Math.random() * titles.length)], images[Math.floor(Math.random() * images.length)], cities[Math.floor(Math.random() * cities.length)], bandNames[Math.floor(Math.random() * bandNames.length)], address, description, keywords[Math.floor(Math.random() * keywords.length)], '03-29-2023'],  (err, dbRes) => {
            if (err) console.log(err)
        })
    }
})