import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import IncomeExpenseTracker from './IncomeExpenseTracker';
import BudgetTracker from './BudgetTracker';
import SavingsGoals from './SavingsGoals';
import FinancialSummary from './FinancialSummary';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income-expense" element={<IncomeExpenseTracker />} />
        <Route path="/budget" element={<BudgetTracker />} />
        <Route path="/savings" element={<SavingsGoals />} />
        <Route path="/summary" element={<FinancialSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
