const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const { bookValidation } = require('../middlewares/validation');

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(bookValidation, createBook);

router.route('/:id')
  .get(getBook)
  .put(bookValidation, updateBook)
  .delete(deleteBook);

module.exports = router;