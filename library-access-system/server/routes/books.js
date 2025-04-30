const express = require('express');
const Book = require('../models/Books');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Add a new book (admin only)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { title, author, genre, available } = req.body;

  try {
    const newBook = new Book({ title, author, genre, available });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a book (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  const { title, author, genre, available } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, available },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a book (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;