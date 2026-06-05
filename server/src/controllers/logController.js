import { logService } from "../services/logService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * HTTP layer only – parse request, call service, send response.
 */
export const logController = {
  createLog: asyncHandler(async (req, res) => {
    const log = await logService.createLog(req.body);

    res.status(201).json({
      success: true,
      data: log,
    });
  }),

  getLogs: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);

    const { level, serviceName, search, from, to } = req.query;

    const result = await logService.getLogs({
      page,
      limit,
      level,
      serviceName,
      search,
      from,
      to,
    });

    res.json({
      success: true,
      data: result.logs,
      pagination: result.pagination,
    });
  }),

  getLogById: asyncHandler(async (req, res) => {
    const log = await logService.getLogById(req.params.id);

    res.json({
      success: true,
      data: log,
    });
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await logService.getStats();

    res.json({
      success: true,
      data: stats,
    });
  }),
};