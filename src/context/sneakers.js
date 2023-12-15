import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

const SneakersContext = createContext();

const SneakersProvider = ({ children }) => {
  const [sneakers, setSneakers] = useState([]);

  const fetchSneakers = useCallback(async () => {
    const response = await axios.get('http://localhost:3005/items');

    setSneakers(response.data);
  }, []);

  const value = {
    sneakers,
    setSneakers,
    fetchSneakers,
  };

  return <SneakersContext.Provider value={value}>{children}</SneakersContext.Provider>;
};

export { SneakersContext, SneakersProvider };
