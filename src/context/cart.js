import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, CART } from '../constants/constants';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingCartItem, setIsLoadingCartItem] = useState(
    new Array(cartItems.length).fill(false)
  );
  const [errorLoadingCart, setErrorLoadingCart] = useState(null);

  const fetchCartItems = useCallback(async () => {
    setIsLoadingCart(true);

    try {
      const response = await axios.get(`${BASE_URL}/${CART}`);
      setCartItems(response.data);
    } catch (error) {
      setErrorLoadingCart('Что-то пошло не так...');
      console.log(`error fetching cart itmes: ${error}`);
    } finally {
      setIsLoadingCart(false);
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
    } catch (error) {
      setErrorLoadingCart('Что-то пошло не так...');
      console.log(`error adding cart item: ${error}`);
    } finally {
      setIsLoadingCartItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
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
    } catch (error) {
      setErrorLoadingCart('Что-то пошло не так...');
      console.log(`error removing cart item: ${error}`);
    } finally {
      setIsLoadingCartItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    }
  };

  const value = {
    fetchCartItems,
    addCartItem,
    removeCartItem,
    cartItems,
    setCartItems,
    isLoadingCart,
    setIsLoadingCart,
    isLoadingCartItem,
    setIsLoadingCartItem,
    errorLoadingCart,
    setErrorLoadingCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
