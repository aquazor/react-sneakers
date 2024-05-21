import { axiosClient } from '../axios.js';
import Cart from '../models/Cart.js';

export const syncAndGetItems = async (req, res) => {
  const { userId } = req;
  const { items: localCartItems } = req.body; // localStorage cart items

  if (!localCartItems) {
    return res.status(422).json({ message: 'Missing items' });
  }

  try {
    // 1. Get items from db
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // 2. If user was not found, create a new user with local items
      const newUserCart = new Cart({ userId, items: localCartItems });

      try {
        await newUserCart.save();
        return res.json({ items: newUserCart.items });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    const serverCartItems = userCart.items;

    if (serverCartItems.length !== localCartItems.length) {
      // 3. If for some reason lengths don't match, return server items without syncing
      console.log('Server items returned');
      return res.json({ items: serverCartItems });
    }

    // 4. Else sync server items with local items
    userCart.items = localCartItems;

    await userCart.save();

    return res.json({ items: localCartItems });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addOrUpdateItem = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Missing Item' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    let updatedItem;

    if (!cart) {
      updatedItem = { ...item };
      cart = new Cart({ userId, items: [updatedItem] });
    } else {
      const index = cart.items.findIndex((cartItem) => cartItem.code === item.code);

      if (index !== -1) {
        cart.items[index].count += 1;
        updatedItem = cart.items[index];
      } else {
        updatedItem = { ...item };
        cart.items.push(updatedItem);
      }
    }

    await cart.save();

    updatedItem = cart.items.find((cartItem) => cartItem.code === item.code);

    return res.json({ item: updatedItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeItem = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Missing Item' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((cartItem) => cartItem.code !== item.code);

    await cart.save();

    return res.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const decrementItemCount = async (req, res) => {
  const { userId } = req;
  const { item } = req.body;

  if (!item) {
    return res.status(422).json({ message: 'Invalid item information' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const index = cart.items.findIndex((cartItem) => cartItem.code === item.code);

    if (index !== -1) {
      if (cart.items[index].count > 1) {
        cart.items[index].count -= 1;
      } else {
        cart.items.splice(index, 1);
      }
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cart.save();

    return res.json({ message: 'Item count decremented successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
