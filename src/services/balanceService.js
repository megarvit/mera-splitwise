import {
    Expense,
    ExpenseParticipant
} from "../models/index.js";


export const calculateUserBalances = async (currentUserId) => {

    const expenses = await Expense.findAll({
        include: [
            {
                model: ExpenseParticipant
            }
        ]
    });

    const balanceMap = {};

    for (const expense of expenses) {
        const payerId = expense.paidBy;
        const participants = expense.ExpenseParticipants;

        for (const participant of participants) {
            const participantId = participant.userId;
            const amountOwed = participant.amountOwed;

            // payer doesn't owe themselves
            if (participantId === payerId) {
                continue;
            }

            // someone owes current user
            if (payerId === currentUserId) {
                if (!balanceMap[participantId]) {
                    balanceMap[participantId] = 0;
                }
                balanceMap[participantId] += amountOwed;
            }

            // current user owes someone
            else if (
                participantId === currentUserId
            ) {
                if (!balanceMap[payerId]) {
                    balanceMap[payerId] = 0;
                }
                balanceMap[payerId] -= amountOwed;
            }
        }
    }

    const finalBalances = [];

    for (const userId in balanceMap) {
        const amount = balanceMap[userId];
        // user should get money
        if (amount > 0) {

            finalBalances.push({
                userId: Number(userId),
                amount,
                type: "GET_BACK"
            });
        }
        // user owes money
        else if (amount < 0) {

            finalBalances.push({
                userId: Number(userId),
                amount: Math.abs(amount),
                type: "YOU_OWE"
            });
        }
    }
    return finalBalances;
};