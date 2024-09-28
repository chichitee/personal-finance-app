import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ff66b2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Finance App
        </Typography>
        <Button component={Link} to="/" color="inherit">Dashboard</Button>
        <Button component={Link} to="/income-expense" color="inherit">Income/Expense</Button>
        <Button component={Link} to="/budget" color="inherit">Budget</Button>
        <Button component={Link} to="/savings" color="inherit">Savings</Button>
        <Button component={Link} to="/summary" color="inherit">Summary</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
