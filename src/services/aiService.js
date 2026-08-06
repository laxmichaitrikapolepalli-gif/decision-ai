import api from './api';

export const aiService = {
  // POST /api/ai/recommend
  recommendTrip: async (payload) => {
    const response = await api.post('/api/ai/recommend', payload);
    return response.data;
  },
};
