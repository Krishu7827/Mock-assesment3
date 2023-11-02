// Import the required libraries
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
},{
  versionKey:false
});


const User = mongoose.model('User', userSchema);


module.exports = {User};
