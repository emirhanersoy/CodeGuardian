/**
 * Centralized error handler
 * Must be registered AFTER routes
 */
function errorHandler(err, req, res, next) {
  console.error('Backend error:', err);

  const status = err.statusCode || 500;

  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
}

module.exports = { errorHandler };