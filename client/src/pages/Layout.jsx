import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { getSneakersItems } from '../redux/thunks/sneakersThunks';
import { syncAndGetItems } from '../redux/thunks/cartThunks';
import { setItems } from '../redux/slices/cartSlice';
import { getCartFromLocal } from '../utils/getCartFromLocal';

const Layout = () => {
  const { token } = useSelectAuth().userAuth;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getSneakersItems());

      if (token) {
        dispatch(syncAndGetItems());
      } else {
        const cartItems = getCartFromLocal();
        dispatch(setItems(cartItems));
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token]);

  return <Outlet />;
};

export default Layout;
