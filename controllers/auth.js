const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Render Sign-up page
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

//Handle sign-up form submission (POST)
router.post('/sign-up', async (req, res) => {
try {
// Checks if username is already taken
  const existingUser = await User.findOne({ username: req.body.username });
if (existingUser) {
  return res.send('Username already taken'); //Feedback if username is taken
}  

// Hash password
const hashedPassword = await bcrypt.hash(req.body.password, 10);

//Create a new userwith hashed password
const newUser = new User ({
  username: req.body.username,
  password: hashedPassword
});

// Save the user to the database
await newUser.save();
res.redirect('/auth/sign-in'); // Redirect to Sign-in page upon successful sign-up
} catch (error) {
console.error(error);
res.redirect('/auth/sign-up'); // Redirect back if there's an error
}
});


//Render Sign-in page
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in');
});



// Export the router
module.exports = router;
