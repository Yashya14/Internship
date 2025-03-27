import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
    // timeout: 2000, // Request timeout
  },
});

export default axiosInstance;

