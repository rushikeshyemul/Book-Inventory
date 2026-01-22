import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  const sizeClasses = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="relative">
        <div className={`animate-spin rounded-full border-4 border-blue-200 ${sizeClasses[size]}`}></div>
        <div className={`animate-spin rounded-full border-4 border-blue-600 border-t-transparent absolute top-0 left-0 ${sizeClasses[size]}`}></div>
      </div>
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;