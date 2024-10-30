const mongoose = require('mongoose');

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
    }
    });

    const User = mongoose.model('User', userSchema);

    module.exports = User;