import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { setItems } from '../../redux/slices/cartSlice';
import { syncAndGetItems } from '../../redux/thunks/cartThunks';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import CartItem from './CartItem';
import CartEmpty from './CartEmpty';

const CartItemsList = ({ items, isLoading }) => {
  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const cartItems = getCartFromLocal();

      dispatch(setItems(cartItems));
      localStorage.setItem('cart', JSON.stringify(cartItems));

      return;
    }

    const syncAndGetCart = async () => {
      try {
        await dispatch(syncAndGetItems());
      } catch (error) {
        console.log(error);
      }
    };

    syncAndGetCart();
  }, [dispatch, token]);

  const renderContent = () => {
    if (!items && isLoading) {
      return <p>Loading...</p>;
    }

    if (items?.length === 0) {
      return <CartEmpty />;
    }

    return items?.map((item) => <CartItem key={item.id} item={item} />);
  };

  return (
    <Box component={'ul'} flexGrow={2} display={'flex'} flexDirection={'column'} gap={3}>
      {renderContent()}
    </Box>
  );
};

export default CartItemsList;
