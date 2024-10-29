// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();

//Set view engine
app.set('view engine', 'ejs');

//Middleware for form data parsing
app.use(express.urlencoded({ extended: true }));

//Middleware for sessions
app.use(
    session({
        secret: process.env.SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: true,
})
);

// Use the auth controller for routes starting with '/auth'
const authController = require('./controllers/auth');
app.use('/auth', authController);

// Home route
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user || null });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});