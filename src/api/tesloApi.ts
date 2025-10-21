import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

const tesloAPI = axios.create({
  baseURL: BASE_URL,
});

// TODO: interceptores

export { tesloAPI };
