import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { axiosPrivate } from '../axios';
import { setIsLoading, setItems } from '../redux/slices/sneakersSlice';
import { Header } from '../components';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(setIsLoading(true));

        const { data } = await axiosPrivate.get('/items');

        dispatch(setItems(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
