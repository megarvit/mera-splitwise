import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Expense = sequelize.define("Expense", {

    expenseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    currency: {
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue: "INR"
    },

    paidBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    expenseDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }

});

export default Expense;