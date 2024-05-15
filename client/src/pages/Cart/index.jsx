import { Box, Container } from '@mui/material';
import { useSelectCart } from '../../hooks/useSelectCart';
import { PageHeading } from '../../components';
import CartSummary from './CartSummary';
import CartItemsList from './CartItemsList';

const Cart = () => {
  const { items, isLoading } = useSelectCart();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      <PageHeading>Cart page</PageHeading>

      <Box flexGrow={1} display={'flex'} mb={4} gap={3}>
        <CartItemsList items={items} isLoading={isLoading} />

        {items && <CartSummary items={items} isLoading={isLoading} />}
      </Box>
    </Container>
  );
};

export default Cart;
