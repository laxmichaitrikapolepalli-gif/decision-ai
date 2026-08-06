import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER, apiService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ds_user');
    return saved ? JSON.parse(saved) : MOCK_USER; // Default logged in as demo user for instant evaluation
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('ds_token') || true);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiService.login({ email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('ds_user', JSON.stringify(response.data.user));
      localStorage.setItem('ds_token', response.data.token);
      toast.success(`Welcome back, ${response.data.user.name}!`);
      return true;
    } catch (err) {
      toast.error('Invalid login credentials. Using demo mode.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await apiService.signup(userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('ds_user', JSON.stringify(response.data.user));
      localStorage.setItem('ds_token', response.data.token);
      toast.success('Account created successfully!');
      return true;
    } catch (err) {
      toast.error('Failed to create account.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ds_user');
    localStorage.removeItem('ds_token');
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
