const { body } = require('express-validator');

const bookValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .matches(/^[a-zA-Z0-9\s\-.,!?'"():]+$/)
    .withMessage('Title contains invalid characters'),

  body('authorName')
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-.']+$/)
    .withMessage('Author name should only contain letters, spaces, hyphens, periods, and apostrophes'),

  body('authorAge')
    .isInt({ min: 1, max: 150 })
    .withMessage('Author age must be a number between 1 and 150'),

  body('authorEmail')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('publisher')
    .notEmpty()
    .withMessage('Publisher is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Publisher must be between 1 and 100 characters'),

  body('publishedDate')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .toDate(),

  body('overview')
    .notEmpty()
    .withMessage('Book overview is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Overview must be between 10 and 1000 characters')
];

module.exports = { bookValidation };