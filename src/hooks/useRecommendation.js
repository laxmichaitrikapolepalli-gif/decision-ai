import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';

export const useRecommendation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.recommendTrip(payload);
      setData(res);
      return res;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to generate AI recommendation';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};
