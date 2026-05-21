import {Op} from "sequelize";
import {ActivityLog} from "../models/index.js";
import {Expense} from "../models/index.js";
import {ExpenseParticipant} from "../models/index.js";

// GET ALL EXPENSES
export const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivityLog.findAll({
            include: [
                {
                    model: Expense,
                    include: [
                        {
                            model: ExpenseParticipant,
                            where: {
                                userId: req.user.userId
                            }
                        }
                    ]      
                }
            ],
            order: [['createdAt', 'DESC']]     
        });

        const formattedActivities = activities.map(activity => ({
            activityId: activity.activityId,
            action: activity.action,
            description: activity.Expense.description,
            amount: activity.Expense.amount,
            currency: activity.Expense.currency,
            expenseDate: activity.Expense.expenseDate,
            createdAt: activity.createdAt
        }));

        res.json(formattedActivities);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const getActivitiesByDateRange = async (req, res) => {

    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Start date and end date are required"
            });
        }

        const activities = await ActivityLog.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
        });

        const formattedActivities = activities.map(activity => ({
            activityId: activity.activityId,
            action: activity.action,
            description: activity.Expense.description,
            amount: activity.Expense.amount,
            currency: activity.Expense.currency,
            expenseDate: activity.Expense.expenseDate,
            createdAt: activity.createdAt
        }));

        res.json(formattedActivities);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};