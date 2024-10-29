const express = require('express');
const router = express.Router();

// Define a simple route for testing
router.get('/sign-in', (req, res) => {
  res.send('Sign In Page');
});

// Export the router
module.exports = router;
