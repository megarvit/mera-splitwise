import {
    Expense,
    ExpenseParticipant
} from "../models/index.js";

import { calculateBalances } from "../services/balanceService.js";


// CREATE EXPENSE
export const addExpense = async (req, res) => {
    try {
        const {
            description,
            amount,
            paidBy,
            participants
        } = req.body;

        const expense = await Expense.create({
            description,
            amount,
            paidBy
        });

        const share = amount / participants.length;

        for (const userId of participants) {
            console.log("creating participant", userId);
            await ExpenseParticipant.create({
                expenseId: expense.expenseId,
                userId,
                share
            });
        }

        res.status(201).json({
            message: "Expense added",
            expense
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// GET ALL EXPENSES
export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// GET SINGLE EXPENSE
export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.json(expense);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount } = req.body;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.update({
            description,
            amount
        });
        res.json(expense);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        // delete participants first
        await ExpenseParticipant.destroy({
            where: {
                expenseId: id
            }
        });

        // delete expense
        await expense.destroy();

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// GET BALANCES
export const getBalances = async (req, res) => {
    try {
        const balances = await calculateBalances();
        res.json(balances);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};