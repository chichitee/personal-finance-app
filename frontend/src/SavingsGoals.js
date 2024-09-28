import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Grid, Box } from '@mui/material';

const SavingsGoals = () => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    if (goalName && goalAmount) {
      const newGoal = {
        name: goalName,
        target: parseFloat(goalAmount),
        current: parseFloat(currentAmount) || 0,
      };
      setGoals([...goals, newGoal]);
      setGoalName('');
      setGoalAmount('');
      setCurrentAmount('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3 }}>
        Savings Goals
      </Typography>
      <Paper sx={{ padding: 3, mt: 3, backgroundColor: '#ffe6f0' }}>
        <Typography variant="h6" sx={{ color: '#ff66b2' }}>Add a New Savings Goal</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Goal Name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Target Amount (R)"
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Amount (R)"
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={handleAddGoal}
              sx={{ backgroundColor: '#ff66b2', color: '#fff' }}
            >
              Add Goal
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Goals */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: '#ff66b2' }}>Your Savings Goals</Typography>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <Paper key={index} sx={{ padding: 2, mt: 2, backgroundColor: '#ffe6f0' }}>
              <Typography variant="h6">{goal.name}</Typography>
              <Typography variant="body1">Target: R{goal.target}</Typography>
              <Typography variant="body1">Current: R{goal.current}</Typography>
              <Typography variant="body1">
                Progress: {((goal.current / goal.target) * 100).toFixed(2)}%
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>No savings goals added yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default SavingsGoals;
