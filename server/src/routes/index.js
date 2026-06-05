import { Router } from "express";
import logRoutes from "./logRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "LogGPT API is running" });
});

router.use("/logs", logRoutes);

export default router;
