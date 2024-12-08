import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#8e44ad' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          FinOvator App
        </Typography>
        <Button component={Link} to="/" sx={{ color: '#fff', '&:hover': { backgroundColor: '#9b59b6' } }}>
          Dashboard
        </Button>
        <Button component={Link} to="/income-expense" sx={{ color: '#fff', '&:hover': { backgroundColor: '#9b59b6' } }}>
          Income/Expense
        </Button>
        <Button component={Link} to="/budget" sx={{ color: '#fff', '&:hover': { backgroundColor: '#9b59b6' } }}>
          Budget
        </Button>
        <Button component={Link} to="/savings" sx={{ color: '#fff', '&:hover': { backgroundColor: '#9b59b6' } }}>
          Savings
        </Button>
        <Button component={Link} to="/summary" sx={{ color: '#fff', '&:hover': { backgroundColor: '#9b59b6' } }}>
          Summary
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
