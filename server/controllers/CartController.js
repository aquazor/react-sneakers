import { axiosClient } from '../axios.js';

export const syncAndGetItems = async (req, res) => {
  const { userId } = req;
  const localCartItems = req.body; // localStorage cart items

  if (!localCartItems) {
    return res.status(422).json({ message: 'Missing items' });
  }

  try {
    // 1. Get items from db
    const { data } = await axiosClient.get(`/cart/${userId}`);
    const serverCartItems = data.items;

    if (serverCartItems.length !== localCartItems.length) {
      // 3. If for some reason lengths dont match return server items without syncing
      console.log('server items returned');
      return res.json(serverCartItems);
    }

    // 4. Else sync server items with local items
    const updatedUser = { id: userId, items: localCartItems };

    try {
      const { data } = await axiosClient.put(`/cart/${userId}`, updatedUser);
      return res.json(data.items);
    } catch (error) {
      console.log('Error syncing items');
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      // 2. If user was not found create a new user with local items
      const newUser = { id: userId, items: localCartItems };

      try {
        await axiosClient.post(`/cart`, newUser);
        return res.json(newUser.items);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating new cart' });
      }
    }

    return res.status(500).json({ message: 'Error getting cart items' });
  }

  return res.json(localCartItems);
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

// export const getItems = async (req, res) => {
//   const { userId } = req;

//   try {
//     const { data } = await axiosClient.get(`/cart/${userId}`);

//     return res.json(data.items);
//   } catch (error) {
//     if (error?.response?.status === 404) {
//       // if user was not found create a new user

//       const newUser = { id: userId, items: [] };

//       try {
//         await axiosClient.post(`/cart`, newUser);
//         return res.json([]);
//       } catch (error) {
//         return res.status(500).json({ message: 'Error creating new cart' });
//       }
//     }

//     return res.status(500).json({ message: 'Error getting cart items' });
//   }
// };
