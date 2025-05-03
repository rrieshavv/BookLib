import axios from 'axios';
import { getAuthData } from './authStorage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request if available
apiClient.interceptors.request.use(
  (config) => {
    const { token } = getAuthData();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
