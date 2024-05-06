import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setIsLoading } from '../redux/slices/sneakersSlice';
import { Header } from '../components';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { useSelectSneakers } from '../hooks/useSelectSneakers';
import { getSneakersItems } from '../redux/thunks/sneakersThunks';
import { syncAndGetItems } from '../redux/thunks/cartThunks';
import { setItems } from '../redux/slices/cartSlice';
import { getCartFromLocal } from '../utils/getCartFromLocal';

const Layout = () => {
  const {
    userAuth: { token },
  } = useSelectAuth();
  const { sortValue } = useSelectSneakers();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(setIsLoading(true));

        await dispatch(getSneakersItems());

        if (token) {
          await dispatch(syncAndGetItems());
        } else {
          const cartItems = getCartFromLocal();
          dispatch(setItems(cartItems));
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchItems();
  }, [dispatch, token]);

  useEffect(() => {
    const getSortedItems = async () => {
      const order = sortValue === 1 ? '-' : '';
      const sortField = `?sortField=${order}price`;

      await dispatch(getSneakersItems(sortField));
    };

    if (sortValue) {
      getSortedItems();
    }
  }, [dispatch, sortValue]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
