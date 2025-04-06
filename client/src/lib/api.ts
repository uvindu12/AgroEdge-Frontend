// lib/api.ts
import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },

});




// Add a request interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchFarmerReport = async (sessionId: string) => {
  const response = await api.get(`/kpi/report/${sessionId}`);
  return response.data;
};

export default api;