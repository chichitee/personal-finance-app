import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BudgetTracker = () => {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [budgetItems, setBudgetItems] = useState([]);

  const handleAddItem = () => {
    if (itemName && itemAmount) {
      setBudgetItems([
        ...budgetItems,
        { name: itemName, amount: parseFloat(itemAmount) },
      ]);
      setItemName('');
      setItemAmount('');
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = budgetItems.filter((_, i) => i !== index);
    setBudgetItems(newItems);
  };

  const totalBudget = budgetItems.reduce((total, item) => total + item.amount, 0);

  return (
    <Container>
      <Paper sx={{ padding: 3, backgroundColor: '#f3e5f5', borderRadius: 3 }}>
        <Typography variant="h4" sx={{ color: '#ff66b2', mt: 3, textAlign: 'center' }}>
          Budget Tracker
        </Typography>
        
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          sx={{ mt: 2, mr: 1, width: '45%' }}
        />
        
        <TextField
          label="Amount"
          type="number"
          value={itemAmount}
          onChange={(e) => setItemAmount(e.target.value)}
          sx={{ mt: 2, mr: 1, width: '45%' }}
        />
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff66b2',
            color: '#fff',
            mt: 2,
            '&:hover': {
              backgroundColor: '#ff3385',
            },
          }}
          onClick={handleAddItem}
        >
          Add Item
        </Button>

        <Typography variant="h6" sx={{ mt: 3, textAlign: 'center' }}>
          Total Budget: R{totalBudget.toFixed(2)}
        </Typography>

        <List sx={{ mt: 2 }}>
          {budgetItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${item.name} - R${item.amount.toFixed(2)}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(index)}>
                  <DeleteIcon sx={{ color: '#ff66b2' }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BudgetTracker;
