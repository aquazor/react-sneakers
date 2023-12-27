import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, FAVORITE } from '../constants/constants';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [isLoadingFavoriteItem, setIsLoadingFavoriteItem] = useState(
    new Array(favoriteItems.length).fill(false)
  );
  const [errorLoadingFavorite, setErrorLoadingFavorite] = useState(null);

  const fetchFavoriteItems = useCallback(async () => {
    setIsLoadingFavorite(true);

    try {
      const response = await axios.get(`${BASE_URL}/${FAVORITE}`);
      setFavoriteItems(response.data);
    } catch (error) {
      setErrorLoadingFavorite('Что-то пошло не так...');
      console.log(`error fetching favorite items: ${error}`);
    } finally {
      setIsLoadingFavorite(false);
    }
  }, []);

  const addFavoriteItem = async (item) => {
    setIsLoadingFavoriteItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      const response = await axios.post(`${BASE_URL}/${FAVORITE}`, item);
      setFavoriteItems((prev) => [...prev, response.data]);
    } catch (error) {
      setErrorLoadingFavorite('Что-то пошло не так...');
      console.log(`error adding favorite item: ${error}`);
    } finally {
      setIsLoadingFavoriteItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    }
  };

  const removeFavoriteItem = async (item) => {
    setIsLoadingFavoriteItem((prev) => {
      const newIsLoading = [...prev];
      newIsLoading[item.id] = true;
      return newIsLoading;
    });

    try {
      await axios.delete(`${BASE_URL}/${FAVORITE}/${item.id}`);
      setFavoriteItems((prev) => prev.filter((obj) => obj.id !== item.id));
    } catch (error) {
      setErrorLoadingFavorite('Что-то пошло не так...');
      console.log(`error removing favorite item: ${error}`);
    } finally {
      setIsLoadingFavoriteItem((prev) => {
        const newIsLoading = [...prev];
        newIsLoading[item.id] = false;
        return newIsLoading;
      });
    }
  };

  const value = {
    fetchFavoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
    favoriteItems,
    setFavoriteItems,
    isLoadingFavorite,
    setIsLoadingFavorite,
    isLoadingFavoriteItem,
    setIsLoadingFavoriteItem,
    errorLoadingFavorite,
    setErrorLoadingFavorite,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export { FavoriteContext, FavoriteProvider };
