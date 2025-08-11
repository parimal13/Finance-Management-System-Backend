import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../models/db.js';

export const addExpense = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const expense = req.body;

        if (!expense || !expense.category || !expense.amount || !expense.month || !expense.year) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('expenses').insertOne(expense);
        if (result.acknowledged) {
            res.status(201).json(true);
        } else {
            res.status(500).json({ error: 'Failed to add expense' });
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};

export const addIncome = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const income = req.body;

        if (!income || !income.source || !income.amount || !income.month || !income.year) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('income').insertOne(income);
        if (result.acknowledged) {
            res.status(201).json(true);
        } else {
            res.status(500).json({ error: 'Failed to add income' });
        }
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ error: 'Failed to add income' });
    }
};

export const addIncomeGoal = async (req, res) => {
    try {
        const { currentIncome, goal } = req.body;

        if (currentIncome < 0 || goal < 0) {
            return res.status(400).json({ error: 'Current income and goal must be non-negative numbers.' });
        }

        const db = await connectToDatabase();
        const incomeGoal = {
            currentIncome,
            goal,
            timestamp: new Date().toISOString()
        };

        const result = await db.collection('incomeGoals').insertOne(incomeGoal);

        if (result.acknowledged) {
            res.status(201).json({ success: true, message: 'Income goal added successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to add income goal.' });
        }
    } catch (error) {
        console.error('Error adding income goal:', error);
        res.status(500).json({ error: 'Failed to add income goal.' });
    }
};


export const addReminder = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const reminder = req.body;

        if (!reminder || !reminder.category || !reminder.amount || !reminder.dueDate || !reminder.reminderDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('reminders').insertOne(reminder);
        if (result.acknowledged) {
            res.status(201).json({ success: true });
        } else {
            res.status(500).json({ error: 'Failed to add reminder' });
        }
    } catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ error: 'Failed to add reminder' });
    }
};

export const addAssets = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const asset = req.body;

        if (!asset || !asset.assetName || !asset.value || !asset.month || !asset.year) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('assets').insertOne(asset);
        if (result.acknowledged) {
            res.status(201).json({ success: true });
        } else {
            res.status(500).json({ error: 'Failed to add asset' });
        }
    } catch (error) {
        console.error('Error adding asset:', error);
        res.status(500).json({ error: 'Failed to add asset' });
    }
};

export const getAllExpenses = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection('expenses').find({}).toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const getAllIncome = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection('income').find({}).toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
export const getAllIncomeGoal = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection('incomeGoals').find({}).toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
export const getAllReminder = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection('reminders').find({}).toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const getAllAssets = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const assets = await db.collection('assets').find({}).toArray();
        res.status(200).json(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const userDetails = await db.collection('users').findOne({});

        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(200).json({});
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};

export const updateUserDetails = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const userDetails = req.body;

        const filter = { userId: userDetails.userId };
        const existingUser = await db.collection('users').findOne(filter);

        if (existingUser) {
            const result = await db.collection('users').updateOne(
                filter,
                { $set: userDetails }
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ success: true, message: 'User details updated successfully.' });
            } else {
                res.status(200).json({ success: true, message: 'User details are already up-to-date.' });
            }
        } else {
            const result = await db.collection('users').insertOne(userDetails);

            if (result.acknowledged) {
                res.status(201).json({ success: true, message: 'User details created successfully.' });
            } else {
                res.status(500).json({ error: 'Failed to create user details' });
            }
        }
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Failed to update user details' });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { expenseId } = req.params;
        const updatedExpense = req.body;

        if (!updatedExpense || !updatedExpense.category || !updatedExpense.amount || !updatedExpense.month || !updatedExpense.year) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('expenses').updateOne(
            { _id: new ObjectId(expenseId) },
            { $set: updatedExpense }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Expense updated successfully.' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { expenseId } = req.params;

        const result = await db.collection('expenses').deleteOne({ _id: new ObjectId(expenseId) });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Expense deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

export const updateIncome = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { incomeId } = req.params;
        const updatedIncome = req.body;

        if (!updatedIncome || !updatedIncome.source || !updatedIncome.amount || !updatedIncome.month || !updatedIncome.year) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('income').updateOne(
            { _id: new ObjectId(incomeId) },
            { $set: updatedIncome }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Income updated successfully.' });
        } else {
            res.status(404).json({ error: 'Income not found' });
        }
    } catch (error) {
        console.error('Error updating income:', error);
        res.status(500).json({ error: 'Failed to update income' });
    }
};

export const deleteIncome = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { incomeId } = req.params;

        const result = await db.collection('income').deleteOne({ _id: new ObjectId(incomeId) });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Income deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Income not found' });
        }
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ error: 'Failed to delete income' });
    }
};

export const updateAsset = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { assetId } = req.params;
        const updatedAsset = req.body;

        if (!updatedAsset || (!updatedAsset.assetName && !updatedAsset.value && !updatedAsset.month && !updatedAsset.year)) {
            return res.status(400).json({ error: 'At least one field must be provided to update' });
        }

        const result = await db.collection('assets').updateOne(
            { _id: new ObjectId(assetId) },
            { $set: updatedAsset }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Asset updated successfully.' });
        } else {
            res.status(404).json({ error: 'Asset not found' });
        }
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Failed to update asset' });
    }
};

export const deleteAsset = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { assetId } = req.params;

        const result = await db.collection('assets').deleteOne({ _id: new ObjectId(assetId) });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Asset deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Asset not found' });
        }
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Failed to delete asset' });
    }
};