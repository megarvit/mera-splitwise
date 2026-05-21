import sequelize from "../config/database.js";
import User from "./user.js";
import Expense from "./expense.js";
import ExpenseParticipant from "./expenseParticipant.js";
import ActivityLog from "./activityLog.js";


// One user can pay many expenses

User.hasMany(Expense, {
    foreignKey: "paidBy"
});

Expense.belongsTo(User, {
    foreignKey: "paidBy"
});


// Many-to-many relationship

User.belongsToMany(Expense, {
    through: ExpenseParticipant,
    foreignKey: "userId",
    otherKey: "expenseId"
});

Expense.belongsToMany(User, {
    through: ExpenseParticipant,
    foreignKey: "expenseId",
    otherKey: "userId"
});

// relation between expense and expense participant

Expense.hasMany(ExpenseParticipant, {
    foreignKey: "expenseId"
});

ExpenseParticipant.belongsTo(Expense, {
    foreignKey: "expenseId"
});

// relation between user and activity log

User.hasMany(ActivityLog, {
    foreignKey: "userId"
});

ActivityLog.belongsTo(User, {
    foreignKey: "userId"
});

// relation between expense and activity log

Expense.hasMany(ActivityLog, {
    foreignKey: "expenseId"
});

ActivityLog.belongsTo(Expense, {
    foreignKey: "expenseId"
});

export {
    sequelize,
    User,
    Expense,
    ExpenseParticipant,
    ActivityLog
};