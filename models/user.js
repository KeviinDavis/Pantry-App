const mongoose = require('mongoose');

//Define Schema for food items
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

//Define the user schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true //makes username unique
    },
    password: {
        type: String,
        required: true
    },
    pantry: [foodSchema] //Embedding foodSchema as an array in the user model
    });


//Create and Export user model
const User = mongoose.model('User', userSchema);
module.exports = User;