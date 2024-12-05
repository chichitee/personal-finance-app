import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Papa from 'papaparse';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState({
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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const transactions = [
    { date: '2024-11-20', type: 'Income', amount: 1500 },
    { date: '2024-11-22', type: 'Expense', amount: 300 },
    { date: '2024-11-25', type: 'Income', amount: 2000 },
    { date: '2024-11-27', type: 'Expense', amount: 400 },
  ];

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(
        (transaction) =>
          transaction.date.includes(searchQuery) ||
          transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const giveFinancialAdvice = () => {
    const incomeData = [3000, 3200, 2800, 3500, 4000, 4500];
    const expensesData = [1200, 1500, 1300, 1800, 1600, 1900];

    const latestIncomeChange = incomeData[incomeData.length - 1] - incomeData[incomeData.length - 2];
    const latestExpenseChange = expensesData[expensesData.length - 1] - expensesData[expensesData.length - 2];
    const latestSavingsChange = latestIncomeChange - latestExpenseChange;

    let advice = 'Based on your recent financial trends: ';

    if (latestIncomeChange > 0) {
      advice += 'Your income has increased recently. Consider saving more of this extra income. ';
    } else if (latestIncomeChange < 0) {
      advice += 'Your income has dropped this month. Look for ways to boost earnings. ';
    } else {
      advice += 'Your income has remained steady. Consider looking for growth opportunities. ';
    }

    if (latestExpenseChange > 0) {
      advice += 'Your expenses have gone up. Consider cutting back in non-essential areas. ';
    } else if (latestExpenseChange < 0) {
      advice += 'Your expenses have decreased, which is good. Keep focusing on savings. ';
    } else {
      advice += 'Your expenses are stable. Keep monitoring your spending habits. ';
    }

    if (latestSavingsChange > 0) {
      advice += 'Your savings are growing. Great job! Consider long-term investment options. ';
    } else if (latestSavingsChange < 0) {
      advice += 'Your savings have decreased. Consider cutting back on unnecessary expenses to save more. ';
    } else {
      advice += 'Your savings are steady. Aim for gradual growth to ensure financial security. ';
    }

    const utterance = new SpeechSynthesisUtterance(advice);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (transcript.toLowerCase().includes('give advice')) {
      giveFinancialAdvice();
    }
  }, [transcript]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
          analyzeCsvData(result.data);
        },
        header: true,
      });
    }
  };

  const analyzeCsvData = (data) => {
    const income = data.filter(row => row.type === 'Income').map(row => parseFloat(row.amount));
    const expenses = data.filter(row => row.type === 'Expense').map(row => parseFloat(row.amount));

    setData({
      labels: data.map(row => row.date),
      datasets: [
        {
          label: 'Income',
          data: income,
          borderColor: '#ff66b2',
          backgroundColor: 'rgba(255, 102, 178, 0.2)',
          fill: true,
        },
        {
          label: 'Expenses',
          data: expenses,
          borderColor: '#ff3366',
          backgroundColor: 'rgba(255, 51, 102, 0.2)',
          fill: true,
        },
      ],
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#ff66b2', textAlign: 'center', mb: 3 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Income, Expenses, Savings Cards */}
        {[
          { label: 'Total Income', value: 'R3,000', change: '+12%' },
          { label: 'Total Expenses', value: 'R1,200', change: '-8%' },
          { label: 'Savings', value: 'R1,800', change: '+20%' },
          { label: 'Upcoming Bills', value: 'R300', change: '+5%' },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              sx={{
                padding: 3,
                backgroundColor: '#ffe6f0',
                '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <Typography variant="h6" sx={{ color: '#ff66b2' }}>{card.label}</Typography>
              <Typography variant="h5">{card.value}</Typography>
              <Typography variant="subtitle2" sx={{ color: card.change.startsWith('+') ? 'green' : 'red' }}>
                {card.change}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>


      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff66b2', color: '#fff' }}
          component="label"
        >
          Upload CSV
          <input
            type="file"
            accept=".csv"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: 4, backgroundColor: '#ffe6f0' }}>
            <Typography variant="h5" sx={{ color: '#ff66b2', mb: 2 }}>
              Income & Expenses Trend
            </Typography>
            <Box sx={{ height: 400 }}> {/* Make the graph bigger by adjusting the height */}
              <Line data={data} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ color: '#ff66b2', mb: 2 }}>
              Recent Transactions Log
            </Typography>
            <TextField
              placeholder="Search transactions"
              variant="outlined"
              size="small"
              sx={{ mb: 2, width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{`R${transaction.amount}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff66b2', color: '#fff', mr: 2 }}
              onClick={startListening}
              disabled={listening}
            >
              Start Listening
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff3366', color: '#fff' }}
              onClick={stopListening}
              disabled={!listening}
            >
              Stop Listening
            </Button>
          </Box>
          <Typography sx={{ textAlign: 'center', mt: 2 }}>Transcript: {transcript}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
