const express = require('express');
const router = express.Router();

// Render Sign-up page
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

//Render Sign-in page
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in');
});



// Export the router
module.exports = router;
