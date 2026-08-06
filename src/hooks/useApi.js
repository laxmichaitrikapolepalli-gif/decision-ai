import { useState, useCallback } from 'react';

export const useApi = (apiFunc, immediate = false, initialParams = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const params = args.length > 0 ? args[0] : initialParams;
        const result = await apiFunc(params);
        setData(result);
        return result;
      } catch (err) {
        const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'An error occurred';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, initialParams]
  );

  return { data, loading, error, execute, setData };
};
