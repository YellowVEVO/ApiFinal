require('dotenv').config({ path: './server/.env' });
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const booksRoutes = require('./routes/books');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/books', booksRoutes);

app.listen(5001, () => console.log('Server running on port 5001'));