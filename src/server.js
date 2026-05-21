import express from "express";

import sequelize from "./config/database.js";

import "./models/index.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

app.use(express.json());

// Routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/activities", activityRoutes);


const PORT = 3000;


async function startServer() {

    try {

        await sequelize.sync({ alter: true });

        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.log(error);
    }
}

startServer();