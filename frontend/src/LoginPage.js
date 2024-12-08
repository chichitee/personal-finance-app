import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // State for managing loading
  const [error, setError] = useState('');  // State for displaying errors
  const navigate = useNavigate();  // Hook for navigation

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');  // Reset any previous error

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);  // Set loading to true while simulating authentication

    // Simulating authentication process (replace with actual logic)
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        onLogin();  // On successful login, call the onLogin function passed as prop
        navigate('/');  // Redirect to the dashboard
      } else {
        setError('Invalid login credentials');  // Show error message
      }
      setLoading(false);  // Set loading to false after authentication attempt
    }, 1000);  // Simulating delay of 1 second for login process
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLoginSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error && error.includes('username') ? error : ''}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error && error.includes('password') ? error : ''}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        )}
        {error && !loading && (
          <Typography variant="body2" color="error" align="center" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default LoginPage;
