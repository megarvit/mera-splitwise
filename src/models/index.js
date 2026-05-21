import User from "./user.js";
import Expense from "./expense.js";
import ExpenseParticipant from "./expenseParticipant.js";


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