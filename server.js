//frameworks
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)

//middlewares
const methodOverride = require('./middlewares/methodOverride');
const setCurrentUser = require('./middlewares/setCurrentUser');
const isLoggedIn = require('./middlewares/ensureLoggedIn');
const loggedInDisplay = require('./middlewares/loggedInDisplay');

//controllers
const gigController = require('./controllers/gig_controller');
const userController = require('./controllers/user_controller');
const sessionController = require('./controllers/session_controller');
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));

app.use(methodOverride);

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


app.use(express.static('public'));

app.use(setCurrentUser);
app.use(loggedInDisplay);

app.use('/', sessionController);
app.use('/', userController);
app.use('/', gigController);



app.listen(port, () => {
    console.log(`listening on port ${port}`);
    });