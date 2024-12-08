import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, MenuItem } from '@mui/material';

const IncomeExpenseTracker = () => {
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (incomeDescription && incomeAmount && incomeCategory) {
      setIncomeList([...incomeList, { description: incomeDescription, amount: Number(incomeAmount), category: incomeCategory }]);
      setIncomeDescription('');
      setIncomeAmount('');
      setIncomeCategory('');
    }
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (expenseDescription && expenseAmount && expenseCategory) {
      setExpenseList([...expenseList, { description: expenseDescription, amount: Number(expenseAmount), category: expenseCategory }]);
      setExpenseDescription('');
      setExpenseAmount('');
      setExpenseCategory('');
    }
  };

  const handleClear = () => {
    setIncomeList([]);
    setExpenseList([]);
  };

  const totalIncome = incomeList.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenseList.reduce((acc, curr) => acc + curr.amount, 0);
  const savings = totalIncome - totalExpenses;

  const message = savings > 0 ? "Great job! Keep saving!" : "Watch out! Your expenses exceed income.";

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#8e44ad', mt: 3 }}>
        Income & Expense Tracker
      </Typography>
      <Typography variant="subtitle1" sx={{ color: savings > 0 ? '#27ae60' : '#e74c3c', mb: 3 }}>
        {message}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#f0e5f7' }}>
            <Typography variant="h6" sx={{ color: '#8e44ad' }}>Add Income</Typography>
            <form onSubmit={handleIncomeSubmit}>
              <TextField
                label="Description"
                value={incomeDescription}
                onChange={(e) => setIncomeDescription(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Amount"
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Category"
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
                fullWidth
                select
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Bonus">Bonus</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#8e44ad', '&:hover': { backgroundColor: '#9b59b6' } }}>
                Add Income
              </Button>
            </form>
            <Typography variant="h6" sx={{ color: '#8e44ad', mt: 3 }}>Total Income: R{totalIncome.toFixed(2)}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#f0e5f7' }}>
            <Typography variant="h6" sx={{ color: '#8e44ad' }}>Add Expense</Typography>
            <form onSubmit={handleExpenseSubmit}>
              <TextField
                label="Description"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Amount"
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Category"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                fullWidth
                select
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#8e44ad', '&:hover': { backgroundColor: '#9b59b6' } }}>
                Add Expense
              </Button>
            </form>
            <Typography variant="h6" sx={{ color: '#8e44ad', mt: 3 }}>Total Expenses: R{totalExpenses.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#f0e5f7' }}>
            <Typography variant="h6" sx={{ color: '#8e44ad' }}>Income List</Typography>
            {incomeList.length > 0 ? (
              <ul>
                {incomeList.map((income, index) => (
                  <li key={index}>
                    {income.description} (Category: {income.category}): R{income.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No income entries yet.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#f0e5f7' }}>
            <Typography variant="h6" sx={{ color: '#8e44ad' }}>Expense List</Typography>
            {expenseList.length > 0 ? (
              <ul>
                {expenseList.map((expense, index) => (
                  <li key={index}>
                    {expense.description} (Category: {expense.category}): R{expense.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No expense entries yet.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Button onClick={handleClear} variant="outlined" sx={{ mt: 3, color: '#8e44ad', borderColor: '#8e44ad', '&:hover': { borderColor: '#9b59b6' } }}>
        Clear All Entries
      </Button>
    </Container>
  );
};

export default IncomeExpenseTracker;
