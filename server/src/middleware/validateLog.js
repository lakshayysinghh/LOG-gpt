import { AppError } from "../utils/AppError.js";

const VALID_LEVELS = ["DEBUG", "INFO", "WARN", "ERROR", "CRITICAL"];

/**
 * Validates incoming log payload before it reaches the service layer.
 */
export function validateLog(req, res, next) {
  try {
    const { serviceName, level, message } = req.body;

    if (!serviceName || typeof serviceName !== "string" || !serviceName.trim()) {
      throw new AppError("serviceName is required and must be a non-empty string", 400);
    }

    if (!level || typeof level !== "string") {
      throw new AppError("level is required", 400);
    }

    const normalizedLevel = level.toUpperCase();
    if (!VALID_LEVELS.includes(normalizedLevel)) {
      throw new AppError(
        `level must be one of: ${VALID_LEVELS.join(", ")}`,
        400
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      throw new AppError("message is required and must be a non-empty string", 400);
    }

    req.body.level = normalizedLevel;
    req.body.serviceName = serviceName.trim();
    req.body.message = message.trim();

    next();
  } catch (err) {
    next(err);
  }
}
