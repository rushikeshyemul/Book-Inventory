import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Navigation */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center min-w-0 flex-1">
              <Link to="/" className="flex items-center group min-w-0">
                <div className="flex-shrink-0 mr-3 lg:mr-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <span className="text-lg lg:text-2xl">📚</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg lg:text-2xl font-bold gradient-text truncate">
                    BookVault
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-500 font-medium hidden sm:block">
                    Inventory Management
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
              <Link
                to="/"
                className={`px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                  </svg>
                  <span className="hidden sm:inline">Library</span>
                  <span className="sm:hidden">Home</span>
                </span>
              </Link>
              <Link
                to="/add"
                className={`px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/add'
                    ? 'bg-green-100 text-green-700 shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden sm:inline">Add Book</span>
                  <span className="sm:hidden">Add</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <main className="max-w-7xl mx-auto py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              @ {new Date().getFullYear()} Rushikesh Yemul. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;