import axios from 'axios';
import { BASE_URL } from '../constants.js';

export const getItems = async (req, res) => {
  const { data } = await axios.get(`${BASE_URL}/items`);

  return res.json(data);
};
