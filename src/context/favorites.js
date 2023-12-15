import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    const response = await axios.get('http://localhost:3005/favorites');

    setFavorites(response.data);
  }, []);

  const addToFavorites = async (data) => {
    const response = await axios.post('http://localhost:3005/favorites', data);

    setFavorites((prev) => [...prev, response.data]);
  };

  const removeFromFavorites = async (id) => {
    await axios.delete(`http://localhost:3005/favorites/${id}`);

    const updatedFavorites = favorites.filter((item) => item.id !== id);

    setFavorites(updatedFavorites);
  };

  const value = {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    favorites,
    setFavorites,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export { FavoritesContext, FavoritesProvider };
