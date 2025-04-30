require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Book = require('./models/Books'); // Correct file name is 'Books.js'

const books = [
  { title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", available: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction", available: true },
  { title: "Moby Dick", author: "Herman Melville", genre: "Adventure", available: true },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", available: true },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", available: true },
  { title: "War and Peace", author: "Leo Tolstoy", genre: "Historical Fiction", available: true },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Philosophical", available: true }
];

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log('Books seeded');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding books:', err);
    mongoose.disconnect();
  });