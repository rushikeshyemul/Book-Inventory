import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookForm from '../components/BookForm';
import toast from 'react-hot-toast';

const AddBookPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await bookService.createBook(data);
      toast.success('Book added successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to add book');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
                <span className="ml-4 text-sm font-medium text-gray-500">Add New Book</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
          <p className="mt-2 text-sm text-gray-700">
            Fill in the information below to add a new book to your inventory.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <BookForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitText="Add Book"
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link to="/" className="btn-secondary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AddBookPage;