const express = require('express');
const router = express.Router();
const RestrictedCountry = require('../models/RestrictedCountry');
const AccessLog = require('../models/Accesslog');
const verifyToken = require('../utils/verifyToken');

function isAdmin(req, res, next)
{
  if (req.user && req.user.role === 'admin')
  {
    next();
  }
  else
  {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
}

router.post('/restrict', verifyToken, isAdmin, async (req, res) =>
{
  const { code } = req.body;

  try
  {
    const existing = await RestrictedCountry.findOne({ code });
    if (existing)
    {
      return res.status(400).json({ message: 'Country is already restricted' });
    }

    const newCountry = new RestrictedCountry(
    {
      code,
      restricted: true
    });
    await newCountry.save();

    res.status(201).json({ message: `Country ${code} added to restricted list` });
  }
  catch (error)
  {
    console.error('Restrict country error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/viewlogs', verifyToken, isAdmin, async (req, res) =>
{
  try
  {
    const logs = await AccessLog.find().sort({ timestamp: -1 });
    res.json(logs);
  }
  catch (error)
  {
    console.error('View logs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
