import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

const SneakersContext = createContext();

const SneakersProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    const response = await axios.get('http://localhost:3005/items');

    setItems(response.data);
  }, []);

  const value = {
    items,
    setItems,
    fetchItems,
  };

  return <SneakersContext.Provider value={value}>{children}</SneakersContext.Provider>;
};

export { SneakersContext, SneakersProvider };
