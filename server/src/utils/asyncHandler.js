/**
 * Wraps async route handlers so rejected promises reach the global error handler.
 * Avoids repetitive try/catch in every controller.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
