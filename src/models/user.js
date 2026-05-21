import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {

    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password : {
        type: DataTypes.STRING,
        allowNull: false
    },

    currency : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "INR"
    }

});

export default User;