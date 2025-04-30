const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this points to your User model
const AccessLog = require('../models/Accesslog');
const RestrictedCountry = require('../models/RestrictedCountry');
const getIPDetails = require('../utils/getIPDetails');
require('dotenv').config({ path: './server/.env' });
const requestIp = require('request-ip');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    // Create a new user
    const newUser = new User({ username, password: password, role: role || 'member' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try
  {
    const user = await User.findOne({ username });
    if (!user)
    {
      console.log("Login Failed: Username not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
    {
      console.log("Login Failed: Password incorrect");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let ip = requestIp.getClientIp(req);
    
    if (ip === '::1' || ip === '::ffff:127.0.0.1')
    {
     ip = '8.8.8.8';
    }
    const ipDetails = await getIPDetails(ip);
    const country = ipDetails.location.country_code2 || 'Unknown';
    const restricted = await RestrictedCountry.findOne({ code: country, restricted: true });

    const accessGranted = !restricted;

    await AccessLog.create({
      ipAddress: ip,
      country: country,
      accessGranted: accessGranted,
      timestamp: new Date()
    });
    if (!accessGranted)
    {
      console.log(`Access Denied for IP: ${ip} (Country: ${country})`);
      return res.status(403).json({ message: 'Access denied from your country' });
    }
    const token = jwt.sign
    (
      { 
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '1h' 
      }
    );

    res.json({ token });

  }
  catch (error)
  {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;