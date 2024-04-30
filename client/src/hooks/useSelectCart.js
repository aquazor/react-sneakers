import { useSelector } from 'react-redux';

export const useSelectCart = () => {
  return useSelector((state) => state.cart);
};
