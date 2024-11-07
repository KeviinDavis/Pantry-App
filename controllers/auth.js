const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Render Sign-up page
router.get('/sign-up', (req, res) => {
  console.log("Attempting to render 'auth/sign-up' view");
  res.render('auth/sign-up');
});

//Handle sign-up form submission (POST)
router.post('/sign-up', async (req, res) => {
try {
// Checks if username is already taken
  const existingUser = await User.findOne({ username: req.body.username });
if (existingUser) {
  return res.send('Username already taken');
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
res.redirect('/auth/sign-in');
} catch (error) {
console.error(error);
res.redirect('/auth/sign-up');
}
});

// Render Sign-in page
router.get('/sign-in', (req, res) => {
  console.log("Attempting to render 'auth/sign-in' view");
  res.render('auth/sign-in');
});

router.post('/sign-in', async (req, res) => {
  try {
    //Find the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.send('Invalid username or password');
  }
  //Compare the password entered with the hashed password in database
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.send('Invalid username or password');
  }

  //Password matches; create a session
  req.session.user = {
    id: user._id,
    username: user.username,
  };

  res.redirect('/');
} catch (error) {
  console.error(error);
  res.redirect('/auth/sign-in');
  }
});

//Handle sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
  }
res.redirect('/'); 
  });
});

// Export the router
module.exports = router;
