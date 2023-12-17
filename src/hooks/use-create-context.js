import axios from 'axios';
import { createContext, useCallback, useState } from 'react';

const BASE_URL = 'http://localhost:3005/';

const UseCreateContext = (path) => {
  const context = createContext();

  const Provider = ({ children }) => {
    const [items, setItems] = useState([]);

    const fetchItems = useCallback(async () => {
      const response = await axios.get(`${BASE_URL}${path}`);

      setItems(response.data);
    }, []);

    const addItem = async (data) => {
      const response = await axios.post(`${BASE_URL}${path}`, data);

      setItems((prev) => [...prev, response.data]);
    };

    const removeItem = async (id) => {
      await axios.delete(`${BASE_URL}${path}/${id}`);

      const updatedItems = items.filter((item) => item.id !== id);

      setItems(updatedItems);
    };

    const value = {
      fetchItems,
      addItem,
      removeItem,
      items,
      setItems,
    };

    return <context.Provider value={value}>{children}</context.Provider>;
  };

  return [context, Provider];
};

export { UseCreateContext };
