import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Container } from '@mui/material';
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

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);  // Toggle dark/light mode
  };

  return (
    // Wrap the entire app with ThemeProvider to apply the theme globally
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
