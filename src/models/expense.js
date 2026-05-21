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

    paidBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

export default Expense;