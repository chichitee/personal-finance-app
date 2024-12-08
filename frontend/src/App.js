import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import IncomeExpenseTracker from "./IncomeExpenseTracker";
import BudgetTracker from "./BudgetTracker";
import SavingsGoals from "./SavingsGoals";
import FinancialSummary from "./FinancialSummary";

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff66b2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff66b2",
    },
    background: {
      default: "#121212",
      paper: "#333333",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// Login Component
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "chichi" && password === "admin") {
      onLogin(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'background.default',
      padding: 3,
    }}
  >
    <Typography
      variant="h3"
      gutterBottom
      sx={{
        color: '#6a1b9a', // Purple color
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
      }}
    >
      WELCOME TO FinOvator App
    </Typography>
    <Box
      sx={{
        width: '300px', // Restrict form width
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Space between elements
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          alignSelf: 'center', // Center the button within the form
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  </Box>
  
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // SpeechRecognition API
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (
        transcript.includes("go to income") ||
        transcript.includes("income tracker")
      ) {
        window.location.href = "/income-expense";
      } else if (
        transcript.includes("go to expenses") ||
        transcript.includes("expense tracker")
      ) {
        window.location.href = "/income-expense";
      } else if (
        transcript.includes("go to budget") ||
        transcript.includes("budget tracker")
      ) {
        window.location.href = "/budget";
      } else if (
        transcript.includes("go to savings") ||
        transcript.includes("savings goals")
      ) {
        window.location.href = "/savings";
      } else if (
        transcript.includes("go to summary") ||
        transcript.includes("financial summary")
      ) {
        window.location.href = "/summary";
      } else if (
        transcript.includes("go back home") ||
        transcript.includes("dashboard")
      ) {
        window.location.href = "/";
      } else if (
        transcript.includes("toggle theme") ||
        transcript.includes("change theme")
      ) {
        handleThemeToggle();
      } else {
        alert("Command not recognized. Please try again.");
      }
    };

    return () => {
      recognition.onresult = null;
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        {isLoggedIn ? (
          <>
            <Navbar />
            <Box sx={{ textAlign: "center", margin: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleThemeToggle}
                sx={{ fontSize: "0.8rem", padding: "5px 12px", margin: 1 }}
              >
                Toggle Dark/Light Mode
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={isListening ? stopListening : startListening}
                sx={{ fontSize: "0.8rem", padding: "5px 12px", margin: 1 }}
              >
                {isListening ? "Stop Listening" : "Start Listening"}
              </Button>
            </Box>
            <Container
              sx={{
                minHeight: "100vh",
                backgroundColor: "background.default",
                paddingBottom: 2,
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/income-expense"
                  element={<IncomeExpenseTracker />}
                />
                <Route path="/budget" element={<BudgetTracker />} />
                <Route path="/savings" element={<SavingsGoals />} />
                <Route path="/summary" element={<FinancialSummary />} />
              </Routes>
            </Container>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={setIsLoggedIn} />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
