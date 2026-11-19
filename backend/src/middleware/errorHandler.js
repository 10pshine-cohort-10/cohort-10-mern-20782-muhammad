import logger from '../utils/logger.js';
import config from '../config/index.js';
import ApiError from '../utils/ApiError.js';

export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    logger.error({ err, reqId: req.id, url: req.originalUrl }, err.message);
  } else {
    logger.warn({ reqId: req.id, url: req.originalUrl, statusCode }, err.message);
  }

  const message =
    statusCode >= 500 && config.env === 'production'
      ? 'Something went wrong on our side. Please try again.'
      : err.message;

  res.status(statusCode).json({ error: { message } });
}
