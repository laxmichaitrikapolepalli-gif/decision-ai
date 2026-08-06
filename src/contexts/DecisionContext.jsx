import React, { createContext, useContext, useState } from 'react';
import { MOCK_DASHBOARD_DATA, MOCK_DECISION_DETAILS, apiService } from '../services/api';
import toast from 'react-hot-toast';

const DecisionContext = createContext();

export const DecisionProvider = ({ children }) => {
  const [decisions, setDecisions] = useState(MOCK_DASHBOARD_DATA.recentDecisions);
  const [currentDecision, setCurrentDecision] = useState(MOCK_DECISION_DETAILS);
  const [loadingDecision, setLoadingDecision] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const addNewDecision = async (payload) => {
    setLoadingDecision(true);
    try {
      const res = await apiService.createDecision(payload);
      const newDec = res.data;
      setDecisions((prev) => [newDec, ...prev]);
      setCurrentDecision(newDec);
      toast.success('AI Decision Simulation Complete!');
      return newDec;
    } catch (err) {
      toast.error('Error running decision simulation.');
      throw err;
    } finally {
      setLoadingDecision(false);
    }
  };

  const toggleAiDrawer = (state) => {
    setAiDrawerOpen((prev) => (typeof state === 'boolean' ? state : !prev));
  };

  return (
    <DecisionContext.Provider
      value={{
        decisions,
        currentDecision,
        loadingDecision,
        addNewDecision,
        setCurrentDecision,
        aiDrawerOpen,
        toggleAiDrawer,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecision = () => {
  const context = useContext(DecisionContext);
  if (!context) throw new Error('useDecision must be used within a DecisionProvider');
  return context;
};
