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
    reset
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

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Book Title *
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Enter book title"
          />
          {errors.title && <p className="error-text">{errors.title.message}</p>}
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
            Author Name *
          </label>
          <input
            type="text"
            id="authorName"
            {...register('authorName')}
            className={`input-field ${errors.authorName ? 'border-red-500' : ''}`}
            placeholder="Enter author name"
          />
          {errors.authorName && <p className="error-text">{errors.authorName.message}</p>}
        </div>

        {/* Author Age */}
        <div>
          <label htmlFor="authorAge" className="block text-sm font-medium text-gray-700">
            Author Age *
          </label>
          <input
            type="number"
            id="authorAge"
            {...register('authorAge')}
            className={`input-field ${errors.authorAge ? 'border-red-500' : ''}`}
            placeholder="Enter author age"
            min="1"
            max="150"
          />
          {errors.authorAge && <p className="error-text">{errors.authorAge.message}</p>}
        </div>

        {/* Author Email */}
        <div>
          <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">
            Author Email *
          </label>
          <input
            type="email"
            id="authorEmail"
            {...register('authorEmail')}
            className={`input-field ${errors.authorEmail ? 'border-red-500' : ''}`}
            placeholder="Enter author email"
          />
          {errors.authorEmail && <p className="error-text">{errors.authorEmail.message}</p>}
        </div>

        {/* Publisher */}
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
            Publisher *
          </label>
          <input
            type="text"
            id="publisher"
            {...register('publisher')}
            className={`input-field ${errors.publisher ? 'border-red-500' : ''}`}
            placeholder="Enter publisher name"
          />
          {errors.publisher && <p className="error-text">{errors.publisher.message}</p>}
        </div>

        {/* Published Date */}
        <div>
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
            Published Date *
          </label>
          <input
            type="date"
            id="publishedDate"
            {...register('publishedDate')}
            className={`input-field ${errors.publishedDate ? 'border-red-500' : ''}`}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.publishedDate && <p className="error-text">{errors.publishedDate.message}</p>}
        </div>

        {/* Overview */}
        <div className="md:col-span-2">
          <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
            Book Overview *
          </label>
          <textarea
            id="overview"
            rows={4}
            {...register('overview')}
            className={`input-field ${errors.overview ? 'border-red-500' : ''}`}
            placeholder="Enter book overview (10-1000 characters)"
          />
          {errors.overview && <p className="error-text">{errors.overview.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn-primary min-w-[120px] flex items-center justify-center"
        >
          {isLoading ? <LoadingSpinner size="small" /> : submitText}
        </button>
      </div>
    </form>
  );
};

export default BookForm;