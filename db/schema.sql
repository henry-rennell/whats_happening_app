create database whats_happening_app;

create table gigs (
    gig_id serial primary key,
    title text,
    description text,
    keywords text,
    posted_by text,
    city text,
    image_url text,
    address text
);

create table users (
    id serial primary key,
    email text unique,
    username text unique,
    password_digest text,
    location text
);

