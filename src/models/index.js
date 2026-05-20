import User from "./User.js";
import Expense from "./Expense.js";
import ExpenseParticipant from "./ExpenseParticipant.js";


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

export {
    User,
    Expense,
    ExpenseParticipant
};