import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async () => {
    const response = await axios.get('http://localhost:3005/cart');

    setCart(response.data);
  }, []);

  const addToCart = async (data) => {
    const response = await axios.post('http://localhost:3005/cart', data);

    setCart((prev) => [...prev, response.data]);
  };

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:3005/cart/${id}`);

    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  };

  const value = {
    fetchCart,
    addToCart,
    removeFromCart,
    cart,
    setCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;
