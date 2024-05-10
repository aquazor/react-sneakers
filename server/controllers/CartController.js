import { axiosClient } from '../axios.js';

export const syncAndGetItems = async (req, res) => {
  const { userId } = req;
  const { items: localCartItems } = req.body; // localStorage cart items

  if (!localCartItems) {
    return res.status(422).json({ message: 'Missing items' });
  }

  try {
    // 1. Get items from db
    const { data: userCartData } = await axiosClient.get(`/cart/${userId}`);
    const serverCartItems = userCartData.items;

    if (serverCartItems.length !== localCartItems.length) {
      // 3. If for some reason lengths dont match return server items without syncing
      console.log('server items returned');
      return res.json({ items: serverCartItems });
    }

    // 4. Else sync server items with local items
    const updatedUser = { id: userId, items: localCartItems };

    try {
      const {
        data: { items },
      } = await axiosClient.put(`/cart/${userId}`, updatedUser);
      return res.json({ items });
    } catch (error) {
      console.log('Error syncing items');
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      // 2. If user was not found create a new user with local items
      const newUser = { id: userId, items: localCartItems };

      try {
        await axiosClient.post(`/cart`, newUser);
        return res.json({ items: newUser.items });
      } catch (error) {
        return res.status(500).json({ message: 'Error creating new cart' });
      }
    }

    return res.status(500).json({ message: 'Error getting cart items' });
  }

  return res.json({ items: localCartItems });
};

export const addOrUpdateItem = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Missing item' });
  }

  try {
    const { data: cartData } = await axiosClient.get(`/cart`);

    const user = cartData.find((user) => user.id === userId);

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

    const cartItems = user.items;

    const index = cartItems.findIndex(
      (cartItem) => item.itemId === cartItem.itemId && item.size === cartItem.size
    );

    if (index !== -1) {
      const newCount = cartItems[index].count + 1;

      cartItems[index] = { ...cartItems[index], count: newCount };
    } else {
      cartItems.push(item);
    }

    const updatedUser = { id: userId, items: [...cartItems] };
    await axiosClient.put(`/cart/${userId}`, updatedUser);

    return res.json({ message: 'Item added or updated successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error adding item' });
  }

  return res.json({ message: 'Item added successfully' });
};

export const removeItem = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Error removing item' });
  }

  try {
    const { data: userCartData } = await axiosClient.get(`/cart/${userId}`);

    const filtered = userCartData.items.filter((obj) => obj.id !== item.id);

    let updatedUser;
    if (filtered.length > 0) {
      updatedUser = { id: userId, items: [...filtered] };
    } else {
      updatedUser = { id: userId, items: [] };
    }

    await axiosClient.put(`/cart/${userId}`, updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error removing item' });
  }

  console.log('Item removed successfully');
  return res.json({ message: 'Item removed successfully' });
};

export const decrementItemCount = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Invalid item information' });
  }

  try {
    const { data: userCartData } = await axiosClient.get(`/cart/${userId}`);
    const cartItems = userCartData.items;

    const index = cartItems.findIndex(
      (cartItem) => item.itemId === cartItem.itemId && item.size === cartItem.size
    );

    if (index !== -1) {
      const newCount = cartItems[index].count - 1;

      if (newCount > 0) {
        cartItems[index] = { ...cartItems[index], count: newCount };
      } else {
        cartItems.splice(index, 1);
      }
    }

    const updatedUser = { id: userId, items: [...cartItems] };

    await axiosClient.put(`/cart/${userId}`, updatedUser);

    return res.json({ message: 'Item count decremented successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error updating cart' });
  }
};
