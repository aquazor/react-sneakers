import { Box, Container } from '@mui/material';
import { useSelectCart } from '../../hooks/useSelectCart';
import { PageHeading } from '../../components';
import CartSummary from './CartSummary';
import CartItemsList from './CartItemsList';

const Cart = () => {
  const { items, isLoading } = useSelectCart();

  return (
    <Container>
      <PageHeading>Cart page</PageHeading>

      <Box display={'flex'} gap={3}>
        <CartItemsList items={items} isLoading={isLoading} />
        <CartSummary items={items} isLoading={isLoading} />
      </Box>
    </Container>
  );
};

export default Cart;
