// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const User = require('./models/user'); 

//Controllers
const authController = require('./controllers/auth');
const foodController = require('./controllers/food');

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB with Mongoose"))
.catch((error) => console.error("Mongoose connection error:", error));

// Set view engine
app.set('view engine', 'ejs');

// Middleware for form data parsing
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Middleware for sessions
app.use(
    session({
        secret: process.env.SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: true,
    })
);

// Use the auth controller for routes starting with '/auth'
app.use('/auth', authController); //Auth route
app.use('/pantry', foodController); //Pantry route


// Home route
app.get('/', async (req, res) => {
    let items = [];
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id);
            items = user ? user.pantry : []; // Fetch pantry items for logged-in user
        } catch (error) {
            console.error(error);
        }
    }
    res.render('pantry/index', { user: req.session.user || null, items });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
