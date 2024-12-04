import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import IncomeExpenseTracker from './IncomeExpenseTracker';
import BudgetTracker from './BudgetTracker';
import SavingsGoals from './SavingsGoals';
import FinancialSummary from './FinancialSummary';

// Define light and dark themes with different background colors
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff66b2',
    },
    background: {
      default: '#f5f5f5', // Light background color
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',  // Black text for light mode
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff66b2',
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#333333',   // Dark paper color for content
    },
    text: {
      primary: '#ffffff',  // White text for dark mode
    },
  },
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);  // State for toggling themes
  const [isListening, setIsListening] = useState(false);  // State for managing voice listening

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);  // Toggle dark/light mode
  };

  // Initialize SpeechRecognition API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;  // Allow continuous listening
  recognition.interimResults = false;  // Get final results only

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  // Handle speech results
  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (transcript.includes('go to income') || transcript.includes('income tracker')) {
        window.location.href = '/income-expense';  // Redirect to Income & Expense Tracker
      } else if (transcript.includes('go to expenses') || transcript.includes('expense tracker')) {
        window.location.href = '/income-expense';  // Redirect to Expense Tracker
      } else if (transcript.includes('go to budget') || transcript.includes('budget tracker')) {
        window.location.href = '/budget';  // Redirect to Budget Tracker
      } else if (transcript.includes('go to savings') || transcript.includes('savings goals')) {
        window.location.href = '/savings';  // Redirect to Savings Goals
      } else if (transcript.includes('go to summary') || transcript.includes('financial summary')) {
        window.location.href = '/summary';  // Redirect to Financial Summary
      } else if (transcript.includes('go back home') || transcript.includes('dashboard')) {
        window.location.href = '/';  // Redirect to Dashboard/Home
      } else if (transcript.includes('toggle theme') || transcript.includes('change theme')) {
        handleThemeToggle();  // Toggle the theme
      } else {
        alert('Command not recognized. Please try again.');
      }
    };

    return () => {
      recognition.onresult = null;  // Cleanup
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        {/* Navbar and toggle button for switching themes */}
        <Navbar />
        <Button
          variant="contained"
          color="primary"
          onClick={handleThemeToggle}
          style={{ margin: '20px' }}
        >
          Toggle Dark/Light Mode
        </Button>

        {/* Button to toggle voice listening */}
        <Button
          variant="contained"
          color="secondary"
          onClick={isListening ? stopListening : startListening}
          style={{ margin: '20px' }}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>

        {/* Main container with dynamic background */}
        <Container sx={{ minHeight: '100vh', backgroundColor: 'background.default', paddingBottom: 2 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income-expense" element={<IncomeExpenseTracker />} />
            <Route path="/budget" element={<BudgetTracker />} />
            <Route path="/savings" element={<SavingsGoals />} />
            <Route path="/summary" element={<FinancialSummary />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
