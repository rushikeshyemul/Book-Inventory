const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  authorAge: {
    type: Number,
    required: [true, 'Author age is required'],
    min: [1, 'Author age must be at least 1'],
    max: [150, 'Author age must be less than 150']
  },
  authorEmail: {
    type: String,
    required: [true, 'Author email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
    trim: true
  },
  publishedDate: {
    type: Date,
    required: [true, 'Published date is required']
  },
  overview: {
    type: String,
    required: [true, 'Book overview is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);