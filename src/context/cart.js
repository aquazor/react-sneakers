import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, CART } from '../constants/constants';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCartItem, setIsLoadingCartItem] = useState(
    new Array(cartItems.length).fill(false)
  );

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${CART}`);

      setCartItems(response.data);
    } catch (error) {
      console.log(`at cart.js: ${error}`);
    }
  }, []);

  const addCartItem = async (item) => {
    setIsLoadingCartItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      const response = await axios.post(`${BASE_URL}/${CART}`, item);

      setCartItems((prev) => [...prev, response.data]);

      setIsLoadingCartItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    } catch (error) {
      console.log(`at cart.js: ${error}`);
    }
  };

  const removeCartItem = async (item) => {
    setIsLoadingCartItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      await axios.delete(`${BASE_URL}/${CART}/${item.id}`);

      setCartItems((prev) => prev.filter((obj) => obj.id !== item.id));

      setIsLoadingCartItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    } catch (error) {
      console.log(`at cart.js: ${error}`);
    }
  };

  const value = {
    fetchCartItems,
    addCartItem,
    removeCartItem,
    cartItems,
    setCartItems,
    isLoadingCartItem,
    setIsLoadingCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
