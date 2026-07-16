const config = require('../config/config');

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    error.statusCode = 404;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `Duplicate value for field '${field}'`;
    error.statusCode = 409;
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error.message = messages.join(', ');
    error.statusCode = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  if (config.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).json({
    statusCode,
    data: null,
    message,
    success: false,
    errors: error.errors || [],
  });
};

module.exports = errorHandler;
