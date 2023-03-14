const { Pool } = require('pg');
const pool = new Pool({
    database: 'whats_happening_app',
});

let sampleDishes = ["Arepas", "Barbecue Ribs", "Bruschette with Tomato", "Bunny Chow", "Caesar Salad", "California Maki", "Caprese Salad", "Cauliflower Penne", "Cheeseburger", "Chicken Fajitas", "Chicken Milanese", "Chicken Parm", "Chicken Wings", "Chilli con Carne", "Ebiten maki", "Fettuccine Alfredo", "Fish and Chips", "French Fries", "Sausages", "French Toast", "Hummus", "Katsu Curry", "Kebab", "Lasagne", "Linguine with Clams", "Massaman Curry", "Meatballs with Sauce", "Mushroom Risotto", "Pappardelle alla Bolognese", "Pasta Carbonara", "Pasta and Beans", "Pasta with Tomato and Basil", "Peking Duck", "Philadelphia Maki", "Pho", "Pierogi", "Pizza", "Poke", "Pork Belly Buns", "Pork Sausage Roll", "Poutine", "Ricotta Stuffed Ravioli", "Risotto with Seafood", "Salmon Nigiri", "Scotch Eggs", "Seafood Paella", "Som Tam", "Souvlaki", "Stinky Tofu", "Sushi", "Tacos", "Teriyaki Chicken Donburi", "Tiramisù", "Tuna Sashimi", "Vegetable Soup"];


let sqlCheck = `create table if not exists gigs (
    gig_id serial primary key,
    title text,
    description text,
    keywords text,
    posted_by text,
    city text,
    image_url text,
    address text
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

pool.query(sqlAddUsers, (err, dbRes) => {
    let sql = `insert into users (email, username, password_digest, location) values ($1, $2, $3, $4);`
    pool.query(sql, ['henryrennell@gmail.com', 'Henry Rennell', '$2b$10$ssdN1qMmEKHrgbfjst1ixOSVu3eSmK86/zdi7t.VZ3K3dn5Mh4.WO', 'Melbourne'], (err, dbRes) => {
        if (err) console.log(err)
    })
})



pool.query(sqlCheck, (err, dbRes) => {
        const img = 'http://via.placeholder.com/600x200';
    for (let count = 0; count < 5; count++) {
        let sql = `insert into gigs (title, image_url, city, posted_by, address, description, keywords) values ($1, $2, $3, $4, $5, $6, $7);`;

        pool.query(sql, [sampleDishes[Math.floor(Math.random() * sampleDishes.length)], img, 'melbourne', 'Henry Rennell', 'example address', 'blah blah blah', 'keywords'],  (err, dbRes) => {
            if (err) console.log(err)
        })
    }
})