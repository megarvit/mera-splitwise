import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ExpenseParticipant = sequelize.define("ExpenseParticipant", {

    id: {
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

    share: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

export default ExpenseParticipant;