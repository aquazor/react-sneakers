import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { PageHeading, CartCard } from '../components';
import { useSelectCart } from '../hooks/useSelectCart';
import { setItems } from '../redux/slices/cartSlice';

const CartContent = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelectCart();

  useEffect(() => {
    let cart;

    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      cart = [];
    }

    dispatch(setItems(cart));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [dispatch]);

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
