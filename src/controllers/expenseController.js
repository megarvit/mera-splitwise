import {
    Expense,
    ExpenseParticipant,
    ActivityLog
} from "../models/index.js";

import { calculateBalances } from "../services/balanceService.js";


// CREATE EXPENSE
export const addExpense = async (req, res) => {
    try {
        const {
            description,
            amount,
            currency,
            paidBy,
            participants,
            expenseDate
        } = req.body;

        //edge case
        if(!participants || participants.length === 0) {
            return res.status(400).json({
                message: "At least one participant is required"
            });
        }

        const expense = await Expense.create({
            description,
            amount,
            currency,
            paidBy,
            createdBy : req.user.userId,
            expenseDate
        });

        // const share = amount / participants.length; // gives x.3333 sometimes

        const share = Number((amount / participants.length).toFixed(2)); // rounds to 2 decimal places

        for (const userId of participants) {
            console.log("creating participant", userId);
            await ExpenseParticipant.create({
                expenseId: expense.expenseId,
                userId,
                amountOwed : share
            });
        }

        await ActivityLog.create({
            expenseId: expense.expenseId,
            userId: req.user.userId,
            action: "Expense Created",
        });

        res.status(201).json({
            message: "Expense added successfully",
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
        const expenses = await Expense.findAll({
            include : [
                {
                    model: ExpenseParticipant,
                    where: {
                        userId: req.user.userId
                    },
                }
            ]
        });

        //equivalent sql query: Get all expenses with the logged in user as participant
        // SELECT * FROM expenses e 
        // JOIN expense_participants ep 
        // ON e.expenseId = ep.expenseId 
        // WHERE ep.userId = req.user.userId;

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// GET  EXPENSE BY ID
export const getExpenseById = async (req, res) => {
    try {
        // const { id } = req.params;
        const expense = await Expense.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: ExpenseParticipant
                    }
                ]
            }
        );

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
// export const updateExpense = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description, amount } = req.body;
//         const expense = await Expense.findByPk(id);

//         if (!expense) {
//             return res.status(404).json({
//                 message: "Expense not found"
//             });
//         }

//         await expense.update({
//             description,
//             amount
//         });
//         res.json(expense);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

//UPDATE EXPENSE LOGIC
export const updateExpense = async (req,res) => {
    try {
        const { id } = req.params;
        const {description, amount, currency, paidBy, participants, expenseDate} = req.body;

        const expense = await Expense.findByPk(id);

        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        // new edge case: only the user who created the expense can update it
        if(expense.createdBy !== req.user.userId){
            return res.status(403).json({
                message: "You are not authorized to update this expense"
            });
        }

        // updating the expense table
        await expense.update({
            description,
            amount,
            currency,
            paidBy,
            expenseDate
        });

        // delete old participants
        await ExpenseParticipant.destroy({
            where: {
                expenseId: id
            }
        });

        // add new participants
        // const share = amount / participants.length;
        const share = Number((amount / participants.length).toFixed(2));
        for(const userId of participants){
            await ExpenseParticipant.create({
                expenseId: id,
                userId,
                amountOwed : share
            });
        }
        
        // add in the activity log that the expense was updated
        await ActivityLog.create({
            expenseId: id,
            userId: req.user.userId,
            action: "Expense Updated",
        });

        res.json({
            message: "Expense updated successfully",
             expense
        });

    }   catch (error) {
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

        if(expense.createdBy !== req.user.userId){
            return res.status(403).json({
                message: "You are not authorized to update this expense"
            });
        }

        // works like an audit log to keep track of all the actions performed by users on expenses
        await ActivityLog.create({
            expenseId: expense.expenseId,
            userId: req.user.userId,
            action: "Expense Deleted",
        });

        // delete participants first
        await ExpenseParticipant.destroy({
            where: {
                expenseId: expense.expenseId
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