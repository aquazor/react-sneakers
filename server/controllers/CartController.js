import axios from 'axios';
import { BASE_URL } from '../constants.js';

export const getItems = async (req, res) => {
  const { userId } = req;

  try {
    const { data } = await axios.get(`${BASE_URL}/cart/${userId}`);

    const items = data.items;

    if (!items) {
      return res.status(404).json({ message: `Cart items not found` });
    }

    return res.json(items);
  } catch (error) {
    console.log(error.message);
  }
};

export const addItem = async (req, res) => {
  const { userId } = req;
  const item = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Error adding item' });
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/cart`);

    const user = data.find((user) => user.id === userId);

    if (!user) {
      const newUser = { id: userId, items: [{ ...item }] };
      await axios.post(`${BASE_URL}/cart`, newUser);

      return res.json({ message: 'Item added successfully' });
    }

    const duplicate = user.items.find((obj) => obj.id === item.id);

    if (duplicate) {
      return res.status(500).json({ message: `Item with id ${item.id} aleady exists` });
    }

    user.items.push(item);

    await axios.put(`${BASE_URL}/cart/${userId}`, user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error adding item' });
  }

  console.log('Item added successfully');
  return res.json({ message: 'Item added successfully' });
};

export const removeItem = async (req, res) => {
  const { userId } = req;
  const item = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Error removing item' });
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/cart/${userId}`);

    const filtered = data.items.filter((obj) => obj.id !== item.id);

    console.log(filtered);

    let updated;

    if (filtered.length > 0) {
      updated = { id: userId, items: [...filtered] };
    } else {
      updated = { id: userId, items: [] };
    }

    console.log(updated);
    await axios.put(`${BASE_URL}/cart/${userId}`, updated);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error removing item' });
  }

  console.log('Item removed successfully');
  return res.json({ message: 'Item removed successfully' });
};
