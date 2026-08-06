import axios from 'axios';
import toast from 'react-hot-toast';

// Centralized Axios Instance reading VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || 'https://hackathon-dmjg.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Authorization Bearer Token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('ds_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global 401 & 500 Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.data?.message;

      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('ds_token');
        localStorage.removeItem('ds_user');
        toast.error(message || 'Session expired. Please log in again.');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = '/login';
        }
      } else if (status === 500) {
        toast.error(message || 'Internal server error. Please try again later.');
      } else {
        toast.error(message || 'An error occurred. Please try again.');
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please check your network connection.');
    } else {
      toast.error('Network error. Unable to reach the server.');
    }
    return Promise.reject(error);
  }
);

export default api;
