import { useState, useCallback, useEffect } from 'react';
import { tripService } from '../services/tripService';

export const useTrips = (autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await tripService.getTrips();
      // Ensure array and sort by newest first if created_at or date field exists
      const tripsList = Array.isArray(res) ? res : res?.trips || res?.data || [];
      const sorted = [...tripsList].sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || a.timestamp || 0).getTime();
        const dateB = new Date(b.created_at || b.date || b.timestamp || 0).getTime();
        return dateB - dateA;
      });
      setData(sorted);
      return sorted;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to load trips history';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [autoFetch, execute]);

  return { data, loading, error, execute, refetch: execute };
};
