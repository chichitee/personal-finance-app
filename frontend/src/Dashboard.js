import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data
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

  // Speech Recognition Setup
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Filter for recent transactions
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

  const giveFinancialAdvice = () => {
    // Example data (replace with real values from your application)
    const incomeData = [3000, 3200, 2800, 3500, 4000, 4500];
    const expensesData = [1200, 1500, 1300, 1800, 1600, 1900];
  
    const latestIncomeChange = incomeData[incomeData.length - 1] - incomeData[incomeData.length - 2];
    const latestExpenseChange = expensesData[expensesData.length - 1] - expensesData[expensesData.length - 2];
    const latestSavingsChange = latestIncomeChange - latestExpenseChange;
  
    let advice = 'Based on your recent financial trends: ';
  
    // Practical advice on income
    if (latestIncomeChange > 0) {
      advice += 'Your income has increased recently, which is a good sign. Make sure to allocate some of this additional income towards savings or debt repayment. ';
    } else if (latestIncomeChange < 0) {
      advice += 'Your income has dropped this month. It might be a good time to review your income sources and consider opportunities to boost earnings, such as freelancing or selling unused assets. ';
    } else {
      advice += 'Your income has remained steady. Consider exploring growth opportunities to improve your financial stability over time. ';
    }
  
    // Practical advice on expenses
    if (latestExpenseChange > 0) {
      advice += 'Your expenses have gone up this month. Review your budget and identify areas where you can cut back, such as dining out or subscriptions. Prioritize essential spending over non-essentials. ';
    } else if (latestExpenseChange < 0) {
      advice += 'Your expenses have decreased, which is a positive step. Use this momentum to build a habit of saving a portion of the amount you’ve reduced. ';
    } else {
      advice += 'Your expenses have stayed the same. Regularly monitor your spending habits to ensure you’re not missing opportunities to save. ';
    }
  
    // Practical advice on savings
    if (latestSavingsChange > 0) {
      advice += 'Your savings are growing, which is excellent. Consider putting this extra money into a high-interest savings account or investing for long-term growth. ';
    } else if (latestSavingsChange < 0) {
      advice += 'Your savings have taken a hit this month. Reassess your budget to identify ways to increase your savings rate. Even small adjustments, like reducing utility costs, can help. ';
    } else {
      advice += 'Your savings are unchanged. A consistent savings plan is good, but you may want to aim for gradual growth to build financial security. ';
    }
  
    // Use SpeechSynthesis to deliver the advice
    const utterance = new SpeechSynthesisUtterance(advice);
    window.speechSynthesis.speak(utterance);
  };
  
  useEffect(() => {
    if (transcript.toLowerCase().includes('give advice')) {
      giveFinancialAdvice();
    }
  }, [transcript]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3 }}>
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

      {/* Voice Command Buttons */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff66b2', color: '#fff', mr: 2 }}
          onClick={startListening}
        >
          Start Listening for Commands
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff3366', color: '#fff' }}
          onClick={stopListening}
        >
          Stop Listening
        </Button>
        <Typography variant="body2" sx={{ mt: 2, color: '#888' }}>
          Try saying: "Give advice" to hear financial tips.
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#ff66b2' }}>
          Income & Expenses Trend
        </Typography>
        <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
          <Line data={data} />
        </Paper>
      </Box>

      {/* Search Transactions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#ff66b2' }}>
          Recent Transactions Log
        </Typography>
        <TextField
          placeholder="Search transactions"
          variant="outlined"
          size="small"
          sx={{ mt: 2, mb: 2, width: '100%' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
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
      </Box>
    </Container>
  );
};

export default Dashboard;
