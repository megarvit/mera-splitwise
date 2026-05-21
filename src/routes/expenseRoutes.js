import express from "express";

import {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getBalances
} from "../controllers/expenseController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, addExpense);
router.get("/", authenticateUser, getAllExpenses);
router.get("/balances", authenticateUser, getBalances);

router.get("/:id", authenticateUser, getExpenseById);
router.put("/:id", authenticateUser, updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;