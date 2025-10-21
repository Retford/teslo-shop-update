import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

const tesloAPI = axios.create({
  baseURL: BASE_URL,
});

// Interceptor
tesloAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { tesloAPI };
