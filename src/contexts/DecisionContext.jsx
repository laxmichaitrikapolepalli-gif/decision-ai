import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { aiService } from '../services/aiService';
import { tripService } from '../services/tripService';
import toast from 'react-hot-toast';

export const DEFAULT_DECISIONS = [
  {
    id: 'DEC-2026-089',
    tag: 'Market Growth',
    title: 'Store Expansion: Hyderabad vs Bangalore',
    recommendation: 'Expand Flagship Store in Hyderabad Hitec City',
    confidence: '96%',
    confidenceScore: 96,
    risk: 'Medium',
    roi: '+28%',
    date: '2026-08-04',
    created_at: '2026-08-04T10:00:00Z',
    status: 'Approved',
  },
  {
    id: 'DEC-2026-088',
    tag: 'IT Infrastructure',
    title: 'Cloud Infrastructure Migration to Multi-Region AWS',
    recommendation: 'Migrate core microservices to AWS ap-south-1 & ap-southeast-1',
    confidence: '98%',
    confidenceScore: 98,
    risk: 'Low',
    roi: '+42%',
    date: '2026-08-01',
    created_at: '2026-08-01T10:00:00Z',
    status: 'Completed',
  },
  {
    id: 'DEC-2026-087',
    tag: 'Finance',
    title: 'AI R&D Budget Allocation Q3-Q4',
    recommendation: 'Allocate ₹2.5M toward generative model fine-tuning and GPU clusters',
    confidence: '91%',
    confidenceScore: 91,
    risk: 'High',
    roi: '+35%',
    date: '2026-07-28',
    created_at: '2026-07-28T10:00:00Z',
    status: 'In Review',
  },
  {
    id: 'DEC-2026-086',
    tag: 'Operations',
    title: 'Supply Chain Supplier Redundancy & Buffer Warehousing',
    recommendation: 'Establish secondary air-freight contract for top 20% SKUs',
    confidence: '94%',
    confidenceScore: 94,
    risk: 'Low',
    roi: '+18%',
    date: '2026-07-22',
    created_at: '2026-07-22T10:00:00Z',
    status: 'Executed',
  }
];

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

const DecisionContext = createContext();

export const DecisionProvider = ({ children }) => {
  const [decisions, setDecisions] = useState(isDemoMode ? DEFAULT_DECISIONS : []);
  const [currentDecision, setCurrentDecision] = useState(isDemoMode ? DEFAULT_DECISIONS[0] : null);
  const [loadingDecision, setLoadingDecision] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  // Fetch initial trips history from GET /api/trips (Supabase DB)
  const fetchTrips = useCallback(async () => {
    try {
      const res = await tripService.getTrips();
      const tripsList = Array.isArray(res) ? res : res?.trips || res?.data || [];
      
      const sorted = [...tripsList].sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || a.timestamp || 0).getTime();
        const dateB = new Date(b.created_at || b.date || b.timestamp || 0).getTime();
        return dateB - dateA;
      });

      if (sorted.length > 0) {
        setDecisions(sorted);
        setCurrentDecision(prev => prev || sorted[0]);
      } else {
        setDecisions(isDemoMode ? DEFAULT_DECISIONS : []);
      }
      return sorted;
    } catch (err) {
      setDecisions(isDemoMode ? DEFAULT_DECISIONS : []);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // Submit AI Recommendation request via POST /api/ai/recommend
  const addNewDecision = async (payload) => {
    setLoadingDecision(true);
    try {
      const res = await aiService.recommendTrip(payload);
      const newRec = res?.data || res;
      setCurrentDecision(newRec);

      // Optimistically update context decisions state instantly
      setDecisions((prev) => [newRec, ...prev]);

      // Re-sync with backend database GET /api/trips
      await fetchTrips().catch(() => {});

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
