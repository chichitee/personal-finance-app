import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  LinearProgress,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SavingsGoals = () => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [goals, setGoals] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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

  const handleUpdateCurrent = (index, newCurrent) => {
    const updatedGoals = [...goals];
    updatedGoals[index].current = parseFloat(newCurrent);
    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return '#8e44ad'; // Purple
    if (progress >= 50) return '#9b59b6'; // Hover Purple
    return 'red';
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      const userMessage = { type: 'user', text: chatInput };
      const botResponse = generateBotResponse(chatInput);

      setChatHistory([...chatHistory, userMessage, botResponse]);
      setChatInput('');
    }
  };

  const generateBotResponse = (input) => {
    let responseText = '';
    const amountMatch = input.match(/R?(\d+)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : null;

    if (amount) {
      responseText = `With R${amount.toFixed(2)}, you can start by setting aside 20% (${(amount * 0.2).toFixed(2)}) for savings. Consider allocating another portion for investments or an emergency fund.`;
    } else {
      responseText = "I'm here to help! Try telling me an amount you have, and I'll suggest saving tips.";
    }

    return { type: 'bot', text: responseText };
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#8e44ad', mt: 3 }}>
        Savings Goals
      </Typography>
      <Paper sx={{ padding: 3, mt: 3, backgroundColor: '#f0e5f7' }}>
        <Typography variant="h6" sx={{ color: '#8e44ad' }}>Add a New Savings Goal</Typography>
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
              sx={{
                backgroundColor: '#8e44ad', 
                color: '#fff', 
                '&:hover': { backgroundColor: '#9b59b6' }
              }}
            >
              Add Goal
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Goals */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: '#8e44ad' }}>Your Savings Goals</Typography>
        {goals.length > 0 ? (
          goals.map((goal, index) => {
            const progress = ((goal.current / goal.target) * 100).toFixed(2);
            const progressColor = getProgressColor(progress);

            return (
              <Paper key={index} sx={{ padding: 2, mt: 2, backgroundColor: '#f0e5f7' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="h6">{goal.name}</Typography>
                    <Typography variant="body1">Target: R{goal.target.toFixed(2)}</Typography>
                    <Typography variant="body1">Current: R{goal.current.toFixed(2)}</Typography>
                    <Typography variant="body1" sx={{ color: progressColor }}>
                      Progress: {progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progress, 100)}
                      sx={{
                        mt: 1,
                        height: 10,
                        borderRadius: 5,
                        '& .MuiLinearProgress-bar': { backgroundColor: progressColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <TextField
                      type="number"
                      label="Update Current"
                      variant="outlined"
                      size="small"
                      value={goal.current}
                      onChange={(e) => handleUpdateCurrent(index, e.target.value)}
                      sx={{ mb: 2, width: '100%' }}
                    />
                    <IconButton
                      onClick={() => handleDeleteGoal(index)}
                      sx={{ color: '#8e44ad' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No savings goals added yet.
          </Typography>
        )}
      </Box>

      {/* Chatbot Section */}
      <Box sx={{ mt: 4, backgroundColor: '#f0e5f7', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#8e44ad' }}>Chat with the Savings Bot</Typography>
        <Box sx={{ maxHeight: '200px', overflowY: 'auto', mt: 2, mb: 2, padding: 2, backgroundColor: '#fff', borderRadius: 1 }}>
          {chatHistory.map((msg, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ color: msg.type === 'user' ? '#000' : '#8e44ad', mb: 1 }}
            >
              {msg.type === 'user' ? 'You: ' : 'Bot: '}
              {msg.text}
            </Typography>
          ))}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleChatSubmit}
              sx={{
                backgroundColor: '#8e44ad', 
                color: '#fff', 
                '&:hover': { backgroundColor: '#9b59b6' }
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SavingsGoals;
