import express from "express";
import { getAllActivities, getActivitiesByDateRange } from "../controllers/activityController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getAllActivities);
router.get("/date-range", authenticateUser, getActivitiesByDateRange);

export default router;