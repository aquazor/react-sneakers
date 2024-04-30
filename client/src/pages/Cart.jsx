import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { PageHeading, CartCard } from '../components';
import { useSelectCart } from '../hooks/useSelectCart';
import { getCartItems } from '../redux/thunks/cartThunks';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { setItems } from '../redux/slices/cartSlice';
import { getCartFromLocal } from '../utils/getCartFromLocal';

const CartContent = () => {
  const {
    userAuth: { token },
  } = useSelectAuth();
  const { items, isLoading } = useSelectCart();

  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      if (!token) {
        const cartItems = getCartFromLocal();

        dispatch(setItems(cartItems));
        localStorage.setItem('cart', JSON.stringify(cartItems));

        return;
      }

      try {
        await dispatch(getCartItems());
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, [dispatch, token]);

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (items.length === 0) {
      return <p>Cart is empty.</p>;
    }

    return items.map((card) => <CartCard key={card.id} card={card} />);
  };

  return (
    <Box
      my={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 210px)',
        placeContent: 'center',
        gap: 4,
      }}
    >
      {renderContent()}
    </Box>
  );
};

const Cart = () => {
  return (
    <Container>
      <PageHeading>Cart page</PageHeading>

      <CartContent />
    </Container>
  );
};

export default Cart;
