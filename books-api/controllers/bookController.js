let books = [];
let idCounter = 1;

exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Title and author required' });

  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.getAllBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.updateBook = (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
};

exports.deleteBook = (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: 'Book deleted' });
};
