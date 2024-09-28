import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const IncomeExpenseTracker = () => {
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (incomeDescription && incomeAmount) {
      setIncomeList([...incomeList, { description: incomeDescription, amount: Number(incomeAmount) }]);
      setIncomeDescription('');
      setIncomeAmount('');
    }
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (expenseDescription && expenseAmount) {
      setExpenseList([...expenseList, { description: expenseDescription, amount: Number(expenseAmount) }]);
      setExpenseDescription('');
      setExpenseAmount('');
    }
  };

  const totalIncome = incomeList.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenseList.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3 }}>
        Income & Expense Tracker
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Add Income</Typography>
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
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff66b2' }}>
                Add Income
              </Button>
            </form>
            <Typography variant="h6" sx={{ color: '#ff66b2', mt: 3 }}>Total Income: R{totalIncome.toFixed(2)}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Add Expense</Typography>
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
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff66b2' }}>
                Add Expense
              </Button>
            </form>
            <Typography variant="h6" sx={{ color: '#ff66b2', mt: 3 }}>Total Expenses: R{totalExpenses.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Income List</Typography>
            {incomeList.length > 0 ? (
              <ul>
                {incomeList.map((income, index) => (
                  <li key={index}>{income.description}: R{income.amount.toFixed(2)}</li>
                ))}
              </ul>
            ) : (
              <Typography>No income entries yet.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Expense List</Typography>
            {expenseList.length > 0 ? (
              <ul>
                {expenseList.map((expense, index) => (
                  <li key={index}>{expense.description}: ${expense.amount.toFixed(2)}</li>
                ))}
              </ul>
            ) : (
              <Typography>No expense entries yet.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IncomeExpenseTracker;
