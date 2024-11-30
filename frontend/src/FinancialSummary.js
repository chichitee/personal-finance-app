import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialSummary = () => {
  const [totalIncome, setTotalIncome] = useState(3000); // Example income
  const [totalExpenses, setTotalExpenses] = useState(1200); // Example expenses
  const [savings, setSavings] = useState(totalIncome - totalExpenses); // Calculated savings

  // Example breakdown data
  const incomeBreakdown = [
    { source: 'Salary', amount: 2000 },
    { source: 'Side Business', amount: 1000 },
  ];

  const expenseBreakdown = [
    { category: 'Rent', amount: 600 },
    { category: 'Groceries', amount: 200 },
    { category: 'Utilities', amount: 150 },
    { category: 'Entertainment', amount: 250 },
  ];

  const expenseLabels = expenseBreakdown.map(item => item.category);
  const expenseValues = expenseBreakdown.map(item => item.amount);

  const pieData = {
    labels: expenseLabels,
    datasets: [
      {
        data: expenseValues,
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
        hoverBackgroundColor: ['#ff6666', '#3399ff', '#66ff66', '#ffb366'],
      },
    ],
  };

  // Function to read out the financial summary using speech synthesis
  const readFinancialSummary = () => {
    const message = `
      Your total income is R${totalIncome.toFixed(2)}. 
      Your total expenses are R${totalExpenses.toFixed(2)}. 
      You have saved R${savings.toFixed(2)}. 
      Your expense breakdown includes: 
      Rent: R${expenseBreakdown[0].amount.toFixed(2)}, 
      Groceries: R${expenseBreakdown[1].amount.toFixed(2)}, 
      Utilities: R${expenseBreakdown[2].amount.toFixed(2)}, 
      Entertainment: R${expenseBreakdown[3].amount.toFixed(2)}.
    `;

    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      {/* Button to trigger voice reading at the top */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#ff66b2', color: '#fff' }} 
            onClick={readFinancialSummary}
          >
            Hear Financial Summary
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3 }}>
        Financial Summary
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Total Income</Typography>
            <Typography variant="h5">R{totalIncome.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Total Expenses</Typography>
            <Typography variant="h5">R{totalExpenses.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Savings</Typography>
            <Typography variant="h5">R{savings.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Expense Breakdown</Typography>
            {/* Set the width and height for the Pie chart */}
            <Pie data={pieData} options={{ responsive: true }} style={{ maxWidth: '300px', maxHeight: '300px' }} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Income Breakdown</Typography>
            <ul>
              {incomeBreakdown.map((item, index) => (
                <li key={index}>
                  {item.source}: R{item.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinancialSummary;
