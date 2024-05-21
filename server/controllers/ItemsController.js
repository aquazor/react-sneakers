import Item from '../models/Item.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.json({ items });
  } catch (error) {
    console.error('Error fetching items:', error.message);
    return res.status(500).json({ error });
  }
};
