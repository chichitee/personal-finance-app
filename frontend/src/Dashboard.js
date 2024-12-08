import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            date: row.date,
            type: row.type,
            category: row.category,
            amount: parseFloat(row.amount),
            description: row.description, // Include description
          }));
          setTransactions(parsedData);
          setFilteredTransactions(parsedData);
        },
        error: (error) => alert(`Error reading file: ${error.message}`),
      });
    }
  };

  const handleDateFilterChange = (event) => {
    const filterDate = event.target.value;
    setDateFilter(filterDate);

    if (filterDate) {
      setFilteredTransactions(transactions.filter((t) => t.date === filterDate));
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handleCategoryFilterChange = (event) => {
    const filterCategory = event.target.value;
    setCategoryFilter(filterCategory);

    if (filterCategory) {
      setFilteredTransactions(transactions.filter((t) => t.category === filterCategory));
    } else {
      setFilteredTransactions(transactions);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#8e44ad', textAlign: 'center', mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* File Upload */}
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ color: '#8e44ad' }}>Upload Transactions (CSV):</Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: '#8e44ad', '&:hover': { backgroundColor: '#7a3d8b' } }}
        >
          Upload File
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
      </Box>

      {/* Date and Category Filter */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select value={dateFilter} onChange={handleDateFilterChange}>
              <MenuItem value="">All Dates</MenuItem>
              {[...new Set(transactions.map((t) => t.date))].map((date) => (
                <MenuItem key={date} value={date}>{date}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
              <MenuItem value="">All Categories</MenuItem>
              {[...new Set(transactions.map((t) => t.category))].map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Graph Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 4, backgroundColor: '#f0e5f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="h5" sx={{ color: '#8e44ad', mb: 2 }}>
              Income & Expenses Trend
            </Typography>
            <Line
              data={{
                labels: filteredTransactions.map((t) => t.date),
                datasets: [
                  {
                    label: 'Income',
                    data: filteredTransactions.filter((t) => t.type === 'Income').map((t) => t.amount),
                    borderColor: '#FF6347',
                    fill: false,
                    tension: 0.1,
                  },
                  {
                    label: 'Expenses',
                    data: filteredTransactions.filter((t) => t.type === 'Expense').map((t) => t.amount),
                    borderColor: '#32CD32',
                    fill: false,
                    tension: 0.1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 4, backgroundColor: '#f0e5f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="h5" sx={{ color: '#8e44ad', mb: 2 }}>
              Category Breakdown
            </Typography>
            <Pie
              data={{
                labels: filteredTransactions.map((t) => t.category),
                datasets: [
                  {
                    label: 'Transaction Categories',
                    data: filteredTransactions.reduce((acc, curr) => {
                      const index = acc.labels.indexOf(curr.category);
                      if (index === -1) {
                        acc.labels.push(curr.category);
                        acc.data.push(curr.amount);
                      } else {
                        acc.data[index] += curr.amount;
                      }
                      return acc;
                    }, { labels: [], data: [] }).data,
                    backgroundColor: ['#FF6347', '#FF1493', '#32CD32', '#FFD700'],
                    hoverBackgroundColor: ['#FF7F50', '#FF69B4', '#98FB98', '#FFD700'],
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        const category = tooltipItem.label;
                        const description = transactions.find((t) => t.category === category)?.description || '';
                        return `${category}: ${tooltipItem.raw} (${description})`;
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Transaction List */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" sx={{ color: '#8e44ad', mb: 2 }}>
          All Transactions
        </Typography>
        <Paper sx={{ padding: 2, backgroundColor: '#f0e5f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          {filteredTransactions.length > 0 ? (
            <Grid container spacing={2}>
              {filteredTransactions.map((transaction, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body1" sx={{ color: '#8e44ad' }}>
                    {transaction.date} - {transaction.type} - {transaction.category} - ${transaction.amount.toFixed(2)} ({transaction.description})
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" sx={{ color: '#8e44ad' }}>No transactions found.</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
