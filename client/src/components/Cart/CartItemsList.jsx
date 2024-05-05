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

    return items?.map((card) => <CartItem key={card.id} card={card} />);
  };

  return (
    <Box
      my={5}
      sx={{
        display: items?.length === 0 ? 'flex' : 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 210px)',
        placeContent: 'center',
        gap: 4,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default CartItemsList;
