/**
 * Error Handling Middleware
 */

const { apiResponse } = require('../utils/helpers');

/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res) {
  res.status(404).json(apiResponse(false, 'Endpoint not found'));
}

/**
 * Global error handler
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json(apiResponse(false, err.message));
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(apiResponse(false, 'Unauthorized'));
  }

  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).json(apiResponse(false, 'Duplicate entry'));
  }

  // Default server error
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(500).json(apiResponse(false, message));
}

/**
 * Async handler wrapper
 * Catches errors in async route handlers
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  notFoundHandler,
  errorHandler,
  asyncHandler
};
