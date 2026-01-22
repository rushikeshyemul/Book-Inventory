import { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import toast from 'react-hot-toast';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getAllBooks();
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(books.filter(book => book._id !== id));
      toast.success('Book deleted successfully');
    } catch (err) {
      toast.error('Failed to delete book');
      throw err;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    deleteBook
  };
};