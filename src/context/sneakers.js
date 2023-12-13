import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

const SneakersContext = createContext();

const Provider = ({ children }) => {
  const [sneakers, setSneakers] = useState([]);
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

  const fetchSneakers = async () => {
    const response = await axios.get('http://localhost:3005/items');

    setSneakers(response.data);
  };

  const value = {
    sneakers,
    setSneakers,
    fetchSneakers,
    fetchCart,
    addToCart,
    removeFromCart,
    cart,
  };

  return <SneakersContext.Provider value={value}>{children}</SneakersContext.Provider>;
};

export { Provider };
export default SneakersContext;
