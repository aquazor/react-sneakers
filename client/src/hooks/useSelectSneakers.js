import { useSelector } from 'react-redux';

export const useSelectSneakers = () => {
  return useSelector((state) => state.sneakers);
};
