import { axiosClient } from '../axios.js';

export const getItems = async (req, res) => {
  try {
    const { data: items } = await axiosClient.get('/items');
    return res.json(items);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Network error' });
  }
};
