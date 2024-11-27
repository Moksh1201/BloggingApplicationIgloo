
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', 
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
