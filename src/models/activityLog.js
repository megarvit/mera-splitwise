import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ActivityLog = sequelize.define("ActivityLog", {

    activityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    expenseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    action: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

export default ActivityLog;