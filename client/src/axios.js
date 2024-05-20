import axios from 'axios';
import { BASE_URL } from './constants';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
