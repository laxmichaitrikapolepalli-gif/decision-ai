import api from './api';
import { evaluateDecisionBattle } from './decisionEngine';

const getMockRecommend = (payload) => ({
  bestRoute: `Primary Strategic Recommendation: ${payload?.source || 'Expand Flagship Store in Hyderabad Hitec City'}`,
  alternativeRoute: `Secondary Option: ${payload?.destination || 'Expand Regional Hub in Bangalore Whitefield'}`,
  estimatedTime: '14.2 Months Payback',
  trafficLevel: 'Low Risk (P95)',
  bestDepartureTime: payload?.departureTime || 'Q3 2026 Target',
  travelCost: payload?.budget || '$2,500,000',
  fuelEfficiency: '+38% Projected ROI',
  confidenceScore: 96,
  reason: `DecisionSphere AI neural model identified ${payload?.source || 'Hyderabad Option A'} as the optimal strategic path, delivering superior payback velocity, municipal tax credits, and lower risk exposure.`,
  tips: [
    'Finalize municipal tax exemption LOI prior to Q3 fiscal deadline',
    'Allocate $1.8M CapEx for initial hardware node deployment',
    'Establish regional R&D hub to capture senior talent density'
  ]
});

export const aiService = {
  // POST /api/ai/recommend
  recommendTrip: async (payload) => {
    try {
      const response = await api.post('/api/ai/recommend', payload, { skipToast: true });
      return response.data;
    } catch (err) {
      console.warn('API key quota exceeded or server endpoint unavailable, using AI simulation engine fallback:', err);
      return getMockRecommend(payload);
    }
  },

  // POST /api/decision-battle or fallback to Decision Intelligence Engine
  calculateBattle: async (payload) => {
    const optA = payload?.optionA || 'Expand Flagship Store in Hyderabad Hitec City';
    const optB = payload?.optionB || 'Expand Regional Hub in Bangalore Whitefield';

    try {
      const response = await api.post('/api/decision-battle', payload, { skipToast: true });
      return response.data;
    } catch (err1) {
      try {
        const response = await api.post('/api/ai/battle', payload, { skipToast: true });
        return response.data;
      } catch (err2) {
        try {
          const response = await api.post('/api/ai/recommend', {
            source: optA,
            destination: optB,
            departureTime: 'Immediate Execution',
            transportMode: 'Strategic Capital Allocation'
          }, { skipToast: true });
          const d = response.data || {};
          if (d && d.confidenceScore) {
            // Map remote response if valid
            const local = evaluateDecisionBattle(optA, optB);
            local.summary = d.reason || local.summary;
            return local;
          }
          return evaluateDecisionBattle(optA, optB);
        } catch (err3) {
          // Automatic local Decision Intelligence Engine calculation
          return evaluateDecisionBattle(optA, optB);
        }
      }
    }
  }
};
