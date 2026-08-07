import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore authenticated user on app load if token exists
  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('ds_token');
      const savedUserStr = localStorage.getItem('ds_user');
      let savedUser = null;
      if (savedUserStr) {
        try { savedUser = JSON.parse(savedUserStr); } catch (e) {}
      }

      if (token) {
        try {
          const profile = await authService.getProfile();
          // Adjust profile object if nested under data or profile key
          const userData = profile?.user || profile?.data?.user || profile?.data || profile;
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('ds_user', JSON.stringify(userData));
        } catch (err) {
          // If rate limit (429) occurs or network issue, preserve existing session instead of logging out
          if (err.response?.status === 429 || !err.response) {
            console.warn('[AuthContext] 429 Rate limit or network delay during restoreAuth. Preserving local user session.');
            if (savedUser) {
              setUser(savedUser);
              setIsAuthenticated(true);
              setLoading(false);
              return;
            }
          }
          // If token verification explicitly fails (401), clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('ds_token');
          localStorage.removeItem('ds_user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    restoreAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const token =
        response?.data?.data?.token ||
        response?.data?.token ||
        response?.data?.access_token ||
        response?.token ||
        response?.access_token ||
        response?.session?.access_token;

      const userData =
        response?.data?.data?.user ||
        response?.data?.user ||
        response?.user ||
        { email, name: email.split('@')[0] };

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('ds_token', token);
      }
      localStorage.setItem('ds_user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${userData.name || userData.email || 'User'}!`);
      return true;
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error("Too many login attempts. Please wait a few minutes and try again.");
        return false;
      }

      const msg = err.response?.data?.error || err.response?.data?.message || 'Invalid login credentials.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      const token =
        response?.data?.data?.token ||
        response?.data?.token ||
        response?.data?.access_token ||
        response?.token ||
        response?.access_token ||
        response?.session?.access_token;

      const registeredUser =
        response?.data?.data?.user ||
        response?.data?.user ||
        response?.user ||
        userData;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('ds_token', token);
      }
      localStorage.setItem('ds_user', JSON.stringify(registeredUser));

      setUser(registeredUser);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to create account.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
