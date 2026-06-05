/**
 * Custom operational error for predictable failures (validation, not found, etc.).
 * The global error handler uses `statusCode` and `isOperational` to format responses.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
