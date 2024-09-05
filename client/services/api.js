import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace with your backend URL
  timeout: 10000,
});

// Optional: Add request and response interceptors
// api.interceptors.request.use(...);
// api.interceptors.response.use(...);

export default api;
