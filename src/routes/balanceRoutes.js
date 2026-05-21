import express from "express";

import {getBalances} from "../controllers/balanceController.js";

import {authenticateUser} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",authenticateUser,getBalances);

export default router;