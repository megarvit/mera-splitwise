import {Op} from "sequelize";
import {ActivityLog} from "../models/index.js";

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

        res.json(activities);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};