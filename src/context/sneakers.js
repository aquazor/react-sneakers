import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, SNEAKERS } from '../constants/constants';

const SneakersContext = createContext();

const SneakersProvider = ({ children }) => {
  const [sneakersItems, setSneakersItems] = useState([]);
  const [isLoadingSneakers, setIsLoadingSneakers] = useState(false);

  const fetchSneakersItems = useCallback(async () => {
    setIsLoadingSneakers(true);

    try {
      await axios.get(`${BASE_URL}/${SNEAKERS}`).then((res) => {
        setSneakersItems(res.data);
        setIsLoadingSneakers(false);
      });
    } catch (error) {
      console.log(`at sneakers.js: ${error}`);
    }
  }, []);

  const value = {
    sneakersItems,
    setSneakersItems,
    fetchSneakersItems,
    isLoadingSneakers,
    setIsLoadingSneakers,
  };

  return <SneakersContext.Provider value={value}>{children}</SneakersContext.Provider>;
};

export { SneakersContext, SneakersProvider };
