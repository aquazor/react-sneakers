import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, FAVORITES } from '../constants/constants';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoadingFavoriteItem, setIsLoadingFavoriteItem] = useState(
    new Array(favoriteItems.length).fill(false)
  );

  const fetchFavoriteItems = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${FAVORITES}`);

      setFavoriteItems(response.data);
    } catch (error) {
      console.log(`at favorite.js: ${error}`);
    }
  }, []);

  const addFavoriteItem = async (item) => {
    setIsLoadingFavoriteItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      const response = await axios.post(`${BASE_URL}/${FAVORITES}`, item);

      setFavoriteItems((prev) => [...prev, response.data]);

      setIsLoadingFavoriteItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    } catch (error) {
      console.log(`at favorite.js: ${error}`);
    }
  };

  const removeFavoriteItem = async (item) => {
    setIsLoadingFavoriteItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      await axios.delete(`${BASE_URL}/${FAVORITES}/${item.id}`);

      setFavoriteItems((prev) => prev.filter((obj) => obj.id !== item.id));

      setIsLoadingFavoriteItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    } catch (error) {
      console.log(`at favorite.js: ${error}`);
    }
  };

  const value = {
    fetchFavoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
    favoriteItems,
    setFavoriteItems,
    isLoadingFavoriteItem,
    setIsLoadingFavoriteItem,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export { FavoriteContext, FavoriteProvider };
