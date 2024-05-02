import axios from 'axios';
import { BASE_URL } from './constants.js';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});
