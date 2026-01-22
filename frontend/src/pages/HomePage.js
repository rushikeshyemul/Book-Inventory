import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';

const HomePage = () => {
  const { books, loading, error, deleteBook } = useBooks();
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, book: null, isDeleting: false });
  const navigate = useNavigate();

  const handleDeleteClick = (book) => {
    setDeleteDialog({ isOpen: true, book, isDeleting: false });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
      await deleteBook(deleteDialog.book._id);
      setDeleteDialog({ isOpen: false, book: null, isDeleting: false });
    } catch (error) {
      setDeleteDialog(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, book: null, isDeleting: false });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="large" text="Loading your book collection..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="card max-w-md mx-auto">
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-5xl font-bold gradient-text mb-4">
              Your Book Collection
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
              Discover, manage, and organize your literary treasures with ease
            </p>
            <div className="flex items-center justify-center lg:justify-start mt-4 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>{books.length} Books</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Always Growing</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Link to="/add" className="btn-primary text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 w-full lg:w-auto inline-block text-center">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      {/* Books Display */}
      {books.length === 0 ? (
        <div className="text-center py-20">
          <div className="card max-w-lg mx-auto">
            <div className="card-body text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Library</h3>
              <p className="text-gray-600 mb-8 text-lg">Your book collection is waiting to be built. Add your first book and begin your literary journey!</p>
              <Link to="/add" className="btn-primary text-lg px-8 py-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Book
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block table-container">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="table-header text-left">Book Details</th>
                    <th className="table-header text-left">Author</th>
                    <th className="table-header text-left">Publisher</th>
                    <th className="table-header text-left">Published</th>
                    <th className="table-header text-center w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {books.map((book, index) => (
                    <tr key={book._id} className="table-row animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                            <span className="text-white text-xs font-bold">📖</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors truncate"
                                 onClick={() => navigate(`/book/${book._id}`)}>
                              {book.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {book.overview.length > 80 ? `${book.overview.substring(0, 80)}...` : book.overview}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div>
                          <div className="font-medium text-gray-900">{book.authorName}</div>
                          <div className="text-sm text-gray-500">{book.authorAge} years old</div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="badge-info">{book.publisher}</span>
                      </td>
                      <td className="table-cell">
                        <div className="text-sm font-medium text-gray-900">{formatDate(book.publishedDate)}</div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => navigate(`/book/${book._id}`)}
                            className="btn-view text-xs px-2 py-1"
                            title="View Details"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => navigate(`/edit/${book._id}`)}
                            className="btn-edit text-xs px-2 py-1"
                            title="Edit Book"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(book)}
                            className="btn-delete text-xs px-2 py-1"
                            title="Delete Book"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {books.map((book, index) => (
              <div key={book._id} className="card animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-white text-lg">📖</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() => navigate(`/book/${book._id}`)}>
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by {book.authorName} ({book.authorAge} years old)
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="badge-info text-xs">{book.publisher}</span>
                        <span className="text-xs text-gray-500">{formatDate(book.publishedDate)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {book.overview.length > 120 ? `${book.overview.substring(0, 120)}...` : book.overview}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/book/${book._id}`)}
                          className="btn-view flex-1 justify-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/edit/${book._id}`)}
                          className="btn-edit flex-1 justify-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(book)}
                          className="btn-delete flex-1 justify-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Enhanced Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteDialog.isDeleting}
        title="Delete Book"
        message={`Are you sure you want to permanently delete "${deleteDialog.book?.title}"? This action cannot be undone and will remove the book from your collection forever.`}
      />
    </div>
  );
};

export default HomePage;