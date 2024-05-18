import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { useSelectCart } from '../../hooks/useSelectCart';
import { setItems } from '../../redux/slices/cartSlice';
import { syncAndGetItems } from '../../redux/thunks/cartThunks';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { PageHeading } from '../../components';
import CartSummary from './CartSummary';
import CartItemsList from './CartItemsList';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const { items, isLoading } = useSelectCart();
  const { token } = useSelectAuth().userAuth;

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

  let content;
  if (!items && isLoading) {
    content = <p>Loading...</p>;
  } else if (items?.length === 0) {
    content = <CartEmpty />;
  } else {
    content = <CartItemsList items={items} isLoading={isLoading} />;
  }

  return (
    <Container
      sx={{
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      <PageHeading>Cart page</PageHeading>

      <Box flexGrow={1} display={'flex'} mb={4} gap={2}>
        {content}

        {items?.length > 0 && <CartSummary items={items} isLoading={isLoading} />}
      </Box>
    </Container>
  );
};

export default Cart;
