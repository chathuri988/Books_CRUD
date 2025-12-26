//  const express = require('express');
//  const mongoose = require('mongoose');
// const app = express();
// const bookRoutes = require('./routes/books');

// app.use(express.json());
// app.use('/books', bookRoutes); // all /books endpoints handled in routes/books.js

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// // 🔗 MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/booksdb')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('DB connection error:', err.message));

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/booksdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err.message));

/* ---------------- CREATE BOOK ---------------- */
app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ---------------- GET ALL BOOKS ---------------- */
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* ---------------- GET BOOK BY ID ---------------- */
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

/* ---------------- UPDATE BOOK ---------------- */
app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ---------------- DELETE BOOK ---------------- */
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
