import api from './api';

export const tripService = {
  // GET /api/trips
  getTrips: async () => {
    const response = await api.get('/api/trips');
    return response.data;
  },
};
