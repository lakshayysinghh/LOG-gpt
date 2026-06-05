import { Router } from "express";
import { logController } from "../controllers/logController.js";
import { validateLog } from "../middleware/validateLog.js";

const router = Router();

router.post("/", validateLog, logController.createLog);
router.get("/stats", logController.getStats);
router.get("/", logController.getLogs);
router.get("/:id", logController.getLogById);

export default router;
