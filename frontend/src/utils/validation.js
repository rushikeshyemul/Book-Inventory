import * as yup from 'yup';

export const bookValidationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(1, 'Title must be at least 1 character')
    .max(200, 'Title must be less than 200 characters')
    .matches(/^[a-zA-Z0-9\s\-.,!?'"():]+$/, 'Title contains invalid characters'),

  authorName: yup
    .string()
    .required('Author name is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters')
    .matches(/^[a-zA-Z\s\-.']+$/, 'Author name should only contain letters, spaces, hyphens, periods, and apostrophes'),

  authorAge: yup
    .number()
    .required('Author age is required')
    .integer('Author age must be a whole number')
    .min(1, 'Author age must be at least 1')
    .max(150, 'Author age must be less than 150'),

  authorEmail: yup
    .string()
    .required('Author email is required')
    .email('Please enter a valid email address'),

  publisher: yup
    .string()
    .required('Publisher is required')
    .min(1, 'Publisher must be at least 1 character')
    .max(100, 'Publisher must be less than 100 characters'),

  publishedDate: yup
    .date()
    .required('Published date is required')
    .max(new Date(), 'Published date cannot be in the future'),

  overview: yup
    .string()
    .required('Book overview is required')
    .min(10, 'Overview must be at least 10 characters')
    .max(1000, 'Overview must be less than 1000 characters')
});