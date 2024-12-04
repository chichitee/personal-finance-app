import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';  // Import ThemeProvider and createTheme

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff66b2',
    },
    background: {
      default: '#f5f5f5',
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
      default: '#121212',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Use the ThemeProvider to apply the theme globally */}
    <ThemeProvider theme={lightTheme}> {/* You can toggle between lightTheme and darkTheme here */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
