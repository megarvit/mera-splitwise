import {
    calculateUserBalances
} from "../services/balanceService.js";


export const getBalances = async (req, res) => {
    try {
        const balances = await calculateUserBalances(
            req.user.userId
        );
        res.json(balances);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};