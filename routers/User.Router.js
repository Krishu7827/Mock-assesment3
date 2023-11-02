const express = require('express');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const UserRouter = express.Router();
const {User} = require('../models/User.Model'); // Import the User model

UserRouter.post('/register', async (req, res) => {
    try {
      const { username, avatar, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Hash the password before saving it
      const saltRounds = 8; // The higher the number, the more secure but slower
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user with the hashed password
      const user = new User({ username, avatar, email, password: hashedPassword });
  
      // Save the user to the database
      await user.save();
  
      // Return a success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  

  // Login route
UserRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by their email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'BlogApp');
  
      // Send the token as a response
      res.status(200).json({ token:token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

module.exports = {UserRouter};
