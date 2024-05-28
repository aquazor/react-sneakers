import { useEffect } from 'react';

export const useScrollTopEffect = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
};
