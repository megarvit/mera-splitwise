import express from "express";

import {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getBalances
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getAllExpenses);
router.get("/balances", getBalances);

router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;