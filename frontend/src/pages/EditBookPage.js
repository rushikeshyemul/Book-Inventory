import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookForm from '../components/BookForm';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.getBookById(id);
        
        // Format the date for the form input
        const bookData = {
          ...response.data,
          publishedDate: new Date(response.data.publishedDate).toISOString().split('T')[0]
        };
        
        setBook(bookData);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await bookService.updateBook(id, data);
      toast.success('Book updated successfully!');
      navigate(`/book/${id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update book');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Book Not Found</h3>
        <p className="text-gray-500 mb-4">{error || 'The requested book could not be found.'}</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to={`/book/${id}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {book.title}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">Edit</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update the information for "{book.title}".
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            submitText="Update Book"
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link to={`/book/${id}`} className="btn-secondary">
          ← Back to Details
        </Link>
      </div>
    </div>
  );
};

export default EditBookPage;