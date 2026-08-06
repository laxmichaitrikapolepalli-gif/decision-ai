import React, { createContext, useContext, useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { tripService } from '../services/tripService';
import toast from 'react-hot-toast';

const DecisionContext = createContext();

export const DecisionProvider = ({ children }) => {
  const [decisions, setDecisions] = useState([]);
  const [currentDecision, setCurrentDecision] = useState(null);
  const [loadingDecision, setLoadingDecision] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  // Fetch initial trips history from GET /api/trips
  const fetchTrips = async () => {
    try {
      const res = await tripService.getTrips();
      const tripsList = Array.isArray(res) ? res : res?.trips || res?.data || [];
      const sorted = [...tripsList].sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || a.timestamp || 0).getTime();
        const dateB = new Date(b.created_at || b.date || b.timestamp || 0).getTime();
        return dateB - dateA;
      });
      setDecisions(sorted);
      if (sorted.length > 0 && !currentDecision) {
        setCurrentDecision(sorted[0]);
      }
      return sorted;
    } catch (err) {
      // Handled gracefully in UI page components
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('ds_token');
    if (token) {
      fetchTrips();
    }
  }, []);

  // Submit AI Recommendation request via POST /api/ai/recommend
  const addNewDecision = async (payload) => {
    setLoadingDecision(true);
    try {
      const res = await aiService.recommendTrip(payload);
      const newRec = res?.data || res;
      setCurrentDecision(newRec);
      setDecisions((prev) => [newRec, ...prev]);
      
      // Re-sync with backend database GET /api/trips in background
      fetchTrips().catch(() => {});
      
      toast.success('AI Recommendation Complete!');
      return newRec;
    } catch (err) {
      toast.error('Error getting AI recommendation.');
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
        fetchTrips,
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
