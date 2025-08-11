import express from 'express';
import {
    addAssets, addExpense, addIncome, addIncomeGoal, addReminder, deleteAsset, deleteExpense,
    deleteIncome, getAllAssets, getAllExpenses, getAllIncome, getAllIncomeGoal, getAllReminder,
    getUserDetails, updateAsset, updateExpense, updateIncome, updateUserDetails
} from '../controllers/recordController.js';

const router = express.Router();

router.post('/expenses', addExpense);
router.get('/expenses/all', getAllExpenses);
router.put('/expenses/update/:expenseId', updateExpense);
router.delete('/expenses/delete/:expenseId', deleteExpense);
router.post('/income', addIncome)
router.get('/income/all', getAllIncome)
router.put('/income/update/:incomeId', updateIncome)
router.delete('/income/delete/:incomeId', deleteIncome);
router.post('/income-goals', addIncomeGoal)
router.get('/income-goals/all', getAllIncomeGoal)
router.post('/reminders', addReminder)
router.get('/reminders/all', getAllReminder)
router.post('/assets', addAssets);
router.get('/assets/all', getAllAssets);
router.put('/assets/update/:assetId', updateAsset);
router.delete('/assets/delete/:assetId', deleteAsset);
router.get('/getuser', getUserDetails);
router.put('/updateuser', updateUserDetails);

export default router;
