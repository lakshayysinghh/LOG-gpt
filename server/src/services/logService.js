import { Log } from "../models/Log.js";
import { AppError } from "../utils/AppError.js";

/**
 * Business logic for log ingestion and retrieval.
 * Controllers delegate here – no DB calls in routes or controllers.
 */
export const logService = {
  async createLog({ serviceName, level, message, timestamp }) {
    const log = await Log.create({
      serviceName,
      level,
      message,
      ...(timestamp && { timestamp: new Date(timestamp) }),
    });

    return log;
  },

  async getLogs({ page = 1, limit = 20, level, serviceName } = {}) {
    const filter = {};

    if (level) {
      filter.level = level.toUpperCase();
    }

    if (serviceName) {
      filter.serviceName = serviceName;
    }

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      Log.find(filter)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Log.countDocuments(filter),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getLogById(id) {
    const log = await Log.findById(id).lean();

    if (!log) {
      throw new AppError("Log not found", 404);
    }

    return log;
  },

  async getStats() {
    const [total, errorCount, criticalCount] = await Promise.all([
      Log.countDocuments(),
      Log.countDocuments({ level: "ERROR" }),
      Log.countDocuments({ level: "CRITICAL" }),
    ]);

    return { total, errorCount, criticalCount };
  },
};
