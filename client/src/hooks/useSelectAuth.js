import { useSelector } from 'react-redux';

export const useSelectAuth = () => {
  return useSelector((state) => state.auth);
};
