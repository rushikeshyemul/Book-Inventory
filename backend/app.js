const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

// Route files
const books = require('./routes/books');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
  credentials: true
}));

// Mount routers
app.use('/api/books', books);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;