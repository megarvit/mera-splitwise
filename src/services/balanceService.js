import {
    Expense,
    ExpenseParticipant
} from "../models/index.js";

export const calculateBalances = async () => {
    const balances = {};

    // Amount paid
    const expenses = await Expense.findAll();

    for (const expense of expenses) {
        const payer = expense.paidBy;
        if (!balances[payer]) {
            balances[payer] = 0;
        }
        balances[payer] += expense.amount;
    }

    // Amount owed
    const participants = await ExpenseParticipant.findAll();

    for (const participant of participants) {
        const userId = participant.userId;
        if (!balances[userId]) {
            balances[userId] = 0;
        }
        balances[userId] -= participant.share;
    }
    console.log(expenses);
    console.log(participants);
    return balances;
};