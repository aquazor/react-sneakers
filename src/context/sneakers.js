import { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL, SNEAKERS } from '../constants/constants';

const SneakersContext = createContext();

const SneakersProvider = ({ children }) => {
  const [sneakersItems, setSneakersItems] = useState([]);
  const [isLoadingSneakers, setIsLoadingSneakers] = useState(false);
  const [errorLoadingSneakers, setErrorLoadingSneakers] = useState(null);

  const fetchSneakersItems = useCallback(async () => {
    setIsLoadingSneakers(true);

    try {
      const response = await axios.get(`${BASE_URL}/${SNEAKERS}`);
      setSneakersItems(response.data);
    } catch (error) {
      setErrorLoadingSneakers('Что-то пошло не так...');
      console.log(`error fetching sneakers items: ${error}`);
    } finally {
      setIsLoadingSneakers(false);
    }
  }, []);

  const value = {
    sneakersItems,
    setSneakersItems,
    fetchSneakersItems,
    isLoadingSneakers,
    setIsLoadingSneakers,
    errorLoadingSneakers,
    setErrorLoadingSneakers,
  };

  return <SneakersContext.Provider value={value}>{children}</SneakersContext.Provider>;
};

export { SneakersContext, SneakersProvider };
