create database whats_happening_app;

create table gigs (
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

create table users (
    id serial primary key,
    email text unique,
    user_name text,
    password_digest text,
    location text,
    username text unique
);

insert into gigs (title, image_url, city, posted_by, artist, address, description, keywords, date) values ('Metal Zone', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHziX1ISZkP5MHkXYcNffgLq5PYiIazxmPCw&usqp=CAU', 'melbourne', 'henry_rennell', 'Henry Rennell', '123 address street', 'blah blah blah', 'Stoner Doom', '28-03-2023');
