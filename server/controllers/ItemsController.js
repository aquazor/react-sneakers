import { axiosClient } from '../axios.js';

export const getItems = async (req, res) => {
  try {
    const { sortField } = req.query;

    let url = '/items';

    if (sortField) {
      url += `?_sort=${sortField}`;
    }

    const { data: items } = await axiosClient.get(url);

    return res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    return res.status(500).json({ message: 'Network error' });
  }
};
