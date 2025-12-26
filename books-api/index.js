 const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');

app.use(express.json());
app.use('/books', bookRoutes); // all /books endpoints handled in routes/books.js

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
