import express from "express";
import { getActivitiesByDateRange } from "../controllers/activityController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getActivitiesByDateRange);

export default router;