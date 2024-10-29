const express = require('express');
const router = express.Router();

// Define a simple route for testing
router.get('/', (req, res) => {
  res.send('Pantry Page');
});

// Export the router
module.exports = router;
