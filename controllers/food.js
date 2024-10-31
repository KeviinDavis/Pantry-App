const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Display all pantry items
router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) return res.redirect('/auth/sign-in');

    //PAss both 'user' and 'items to the view
    res.render('pantry/index', { user: req.session.user, items: user.pantry });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

//Show form for new pantry items
router.get('/new', (req, res) => {
  res.render('pantry/new');
});

//Add new pantry item
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) return res.redirect('/auth/sign-in');
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect('/pantry');
  }catch(error) {
    console.error(error);
    res.redirect('/pantry/new');
  }
});

//Show form to edit a pantry item
router.get('/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    const item = user.pantry.id(req.params.id);
    if (!item) return res.redirect('/pantry');
    res.render('pantry/edit', { item });
    } catch (error) {
      console.error(error);
      res.redirect('/pantry');
    }
  });
  
//Update a pantry item
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    const item = user.pantry.id(req.params.id);
    
    if (item) {
      item.name = req.body.name;
      await user.save();
    }
    
    res.redirect('/pantry');
    } catch (error) {
      console.error(error);
      res.redirect('/pantry');
  }
});

// Delete pantry items
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) return res.redirect('/auth/sign-in');

    // Find the index of the item in the pantry array
    const itemIndex = user.pantry.findIndex(item => item._id.toString() === req.params.id);
    if (itemIndex > -1) {
      user.pantry.splice(itemIndex, 1); // Remove the item from the array
      await user.save(); // Save the updated user document
    }
    
    res.redirect('/pantry');
  } catch (error) {
    console.error(error);
    res.redirect('/pantry');
  }
});


// Export the router
module.exports = router;
