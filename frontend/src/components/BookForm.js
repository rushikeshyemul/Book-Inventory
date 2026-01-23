import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookValidationSchema } from '../utils/validation';
import LoadingSpinner from './LoadingSpinner';

const BookForm = ({ initialData, onSubmit, isLoading, submitText = 'Submit' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(bookValidationSchema),
    defaultValues: initialData || {
      title: '',
      authorName: '',
      authorAge: '',
      authorEmail: '',
      publisher: '',
      publishedDate: '',
      overview: ''
    },
    mode: 'onChange'
  });

  const watchedOverview = watch('overview', '');

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (!initialData) {
        reset();
      }
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Title */}
            <div className="lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                placeholder="Enter the book title"
              />
              {errors.title && <p className="error-text">{errors.title.message}</p>}
            </div>

            {/* Author Name */}
            <div>
              <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700 mb-2">
                Author Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="authorName"
                  {...register('authorName')}
                  className={`input-field ${errors.authorName ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  placeholder="Enter author's full name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.authorName && <p className="error-text">{errors.authorName.message}</p>}
            </div>

            {/* Author Age */}
            <div>
              <label htmlFor="authorAge" className="block text-sm font-semibold text-gray-700 mb-2">
                Author Age *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="authorAge"
                  {...register('authorAge')}
                  className={`input-field ${errors.authorAge ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  placeholder="Enter author's age"
                  min="1"
                  max="150"
                />
              </div>
              {errors.authorAge && <p className="error-text">{errors.authorAge.message}</p>}
            </div>

            {/* Author Email */}
            <div>
              <label htmlFor="authorEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                Author Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="authorEmail"
                  {...register('authorEmail')}
                  className={`input-field ${errors.authorEmail ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  placeholder="author@example.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.authorEmail && <p className="error-text">{errors.authorEmail.message}</p>}
            </div>

            {/* Publisher */}
            <div>
              <label htmlFor="publisher" className="block text-sm font-semibold text-gray-700 mb-2">
                Publisher *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="publisher"
                  {...register('publisher')}
                  className={`input-field ${errors.publisher ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  placeholder="Enter publisher name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              {errors.publisher && <p className="error-text">{errors.publisher.message}</p>}
            </div>

            {/* Published Date */}
            <div>
              <label htmlFor="publishedDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Published Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="publishedDate"
                  {...register('publishedDate')}
                  className={`input-field ${errors.publishedDate ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.publishedDate && <p className="error-text">{errors.publishedDate.message}</p>}
            </div>

            {/* Overview */}
            <div className="lg:col-span-2">
              <label htmlFor="overview" className="block text-sm font-semibold text-gray-700 mb-2">
                Book Overview *
              </label>
              <div className="relative">
                <textarea
                  id="overview"
                  rows={5}
                  {...register('overview')}
                  className={`input-field resize-none ${errors.overview ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  placeholder="Provide a detailed overview of the book (10-1000 characters)"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {watchedOverview.length}/1000
                </div>
              </div>
              {errors.overview && <p className="error-text">{errors.overview.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn-primary min-w-[160px] flex items-center justify-center text-lg"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {submitText}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;