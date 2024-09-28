import React, { useState } from 'react';
import { Container, Paper, Grid, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for income and expenses
  const [data] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 3200, 2800, 3500, 4000, 4500],
        borderColor: '#ff66b2',
        backgroundColor: 'rgba(255, 102, 178, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [1200, 1500, 1300, 1800, 1600, 1900],
        borderColor: '#ff3366',
        backgroundColor: 'rgba(255, 51, 102, 0.2)',
        fill: true,
      },
    ],
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Total Income</Typography>
            <Typography variant="h5">R3,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Total Expenses</Typography>
            <Typography variant="h5">R1,200</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Savings</Typography>
            <Typography variant="h5">R1,800</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Upcoming Bills</Typography>
            <Typography variant="h5">R300</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#ff66b2' }}>
          Income & Expenses Trend
        </Typography>
        <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
          <Line data={data} />
        </Paper>
      </Box>

      {/* Additional Information */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Recent Transactions</Typography>
            <ul>
              <li>Income: R2,000 from Freelance Work</li>
              <li>Expense: R800 for Groceries</li>
              <li>Expense: R200 for Utilities</li>
              <li>Income: R500 from Side Job</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h6" sx={{ color: '#ff66b2' }}>Savings Goals</Typography>
            <Typography variant="body1">Goal: R10,000 for Vacation</Typography>
            <Typography variant="body1">Current Savings: R1,800</Typography>
            <Typography variant="body1">Remaining: R8,200</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
