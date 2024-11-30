import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, Typography, Box, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
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

  // Set up Speech Recognition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Function to analyze the trends and provide financial advice
  const giveFinancialAdvice = () => {
    const incomeData = [3000, 3200, 2800, 3500, 4000, 4500]; // Replace with real data
    const expensesData = [1200, 1500, 1300, 1800, 1600, 1900]; // Replace with real data

    // Analyzing trends
    const incomeTrend = incomeData[incomeData.length - 1] - incomeData[0]; // Change in income
    const expensesTrend = expensesData[expensesData.length - 1] - expensesData[0]; // Change in expenses
    const savingsTrend = incomeTrend - expensesTrend; // Difference between income and expenses

    // Constructing the advice message
    let advice = 'Here is your financial advice based on the trends: ';
    
    if (incomeTrend > 0) {
      advice += 'Your income has increased over the last few months, which is great. ';
    } else if (incomeTrend < 0) {
      advice += 'Your income has decreased recently. Consider finding ways to increase your income. ';
    } else {
      advice += 'Your income has remained steady. ';
    }

    if (expensesTrend > 0) {
      advice += 'However, your expenses have been rising, which could affect your savings. Try to track and reduce unnecessary expenses. ';
    } else if (expensesTrend < 0) {
      advice += 'Your expenses have been decreasing, which is positive. Keep up the good work on saving. ';
    } else {
      advice += 'Your expenses have remained stable. ';
    }

    if (savingsTrend > 0) {
      advice += 'Overall, you are saving more, which is excellent for future goals. ';
    } else if (savingsTrend < 0) {
      advice += 'It seems like your savings could be improved. Consider revising your budget to save more each month. ';
    } else {
      advice += 'Your savings are steady, but could be improved. ';
    }

    advice += 'Continue reviewing your financial trends regularly to stay on track with your goals.';
    
    // Using SpeechSynthesis API to read the advice aloud
    const utterance = new SpeechSynthesisUtterance(advice);
    window.speechSynthesis.speak(utterance);
  };

  // Effect to start listening and automatically give advice when voice command is detected
  useEffect(() => {
    if (transcript.toLowerCase().includes('give advice')) {
      giveFinancialAdvice();
    }
  }, [transcript]);

  // Function to start listening
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  // Function to stop listening and reset transcript
  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript(); // Reset the transcript when stopping listening
  };

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

      {/* Voice Command Button */}
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
      </Box>

      {/* Voice Command Output */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Voice Command:</Typography>
        <Typography variant="body1" sx={{ color: '#ff66b2' }}>
          {transcript || 'Say something...'}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff66b2', color: '#fff' }}
          onClick={giveFinancialAdvice}
        >
          Hear Financial Advice
        </Button>
      </Box>


      {/* Chart Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#ff66b2' }}>
          Income & Expenses Trend
        </Typography>
        <Paper sx={{ padding: 3, backgroundColor: '#ffe6f0' }}>
          <Line data={data} />
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
