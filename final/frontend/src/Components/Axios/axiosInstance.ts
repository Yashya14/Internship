import axios from 'axios';
// import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',

  },
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const errorMessage = error.response.data.message || 'An error occurred';
//       toast.error(errorMessage);
//     } else {
//       toast.error('Network Error');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

