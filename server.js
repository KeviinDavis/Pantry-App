
//Load environmental variables from .env file
const dotenv = require ('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const authController = require('./controllers/auth');
const foodController = require('./controllers/food');

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Log connection success or error
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    });
 mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
    });

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

//Routes
app.use('/auth', authController);
app.use('/pantry', foodController);

//Root Routes
app.get('/', (req, res) => res.render('index', { user: null }));

//Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));