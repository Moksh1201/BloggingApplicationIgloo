import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this matches your backend URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
