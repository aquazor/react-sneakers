import { axiosClient } from '../axios.js';

export const getItems = async (req, res) => {
  const { userId } = req;

  try {
    const { data } = await axiosClient.get(`/cart/${userId}`);

    return res.json(data.items);
  } catch (error) {
    if (error?.response?.status === 404) {
      // if user was not found create a new user

      const newUser = { id: userId, items: [] };

      try {
        await axiosClient.post(`/cart`, newUser);
        return res.json([]);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating new cart' });
      }
    }

    return res.status(500).json({ message: 'Error getting cart items' });
  }
};

export const addItem = async (req, res) => {
  const { userId } = req;
  const item = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Missing item' });
  }

  try {
    const { data } = await axiosClient.get(`/cart`);

    const user = data.find((user) => user.id === userId);

    if (!user) {
      // if user was not found create a new user, add an item and post the user

      const newUser = { id: userId, items: [{ ...item }] };

      try {
        await axiosClient.post(`/cart`, newUser);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating new cart' });
      }

      return res.json({ message: 'Item added successfully' });
    }

    const items = user.items;
    const duplicate = items.find((obj) => obj.id === item.id);

    if (duplicate) {
      return res.status(500).json({ message: `Item with id ${item.id} already exists` });
    }

    items.push(item);

    await axiosClient.put(`/cart/${userId}`, user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error adding item' });
  }

  return res.json({ message: 'Item added successfully' });
};

export const removeItem = async (req, res) => {
  const { userId } = req;
  const item = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Error removing item' });
  }

  try {
    const { data } = await axiosClient.get(`/cart/${userId}`);

    const filtered = data.items.filter((obj) => obj.id !== item.id);

    let updated;
    if (filtered.length > 0) {
      updated = { id: userId, items: [...filtered] };
    } else {
      updated = { id: userId, items: [] };
    }

    await axiosClient.put(`/cart/${userId}`, updated);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error removing item' });
  }

  console.log('Item removed successfully');
  return res.json({ message: 'Item removed successfully' });
};

export const syncItems = async (req, res) => {
  const { userId } = req;
  const items = req.body;

  if (!items) {
    return res.status(422).json({ message: 'Missing items' });
  }

  const updatedUser = { id: userId, items };

  try {
    await axiosClient.put(`/cart/${userId}`, updatedUser);
  } catch (error) {
    if (error?.response?.status === 404) {
      // if user was not found create a new user with cart items

      try {
        await axiosClient.post(`/cart`, updatedUser);
        return res.json([]);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating new cart' });
      }
    }

    return res.status(500).json({ message: 'Error syncing cart' });
  }

  console.log('Cart synced successfully');
  return res.json({ message: 'Cart synced successfully' });
};
