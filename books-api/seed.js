const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect('mongodb://127.0.0.1:27017/booksdb');

const seedBooks = async () => {
  await Book.deleteMany();

  await Book.insertMany([
    { title: 'Clean Code', author: 'Robert Martin' },
    { title: 'Atomic Habits', author: 'James Clear' }
  ]);

  console.log('Database seeded');
  process.exit();
};

seedBooks();
