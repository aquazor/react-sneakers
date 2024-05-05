import { Container } from '@mui/material';
import { PageHeading, CartItemsList, CartSummary } from '../components';
import { useSelectCart } from '../hooks/useSelectCart';

const Cart = () => {
  const { items, isLoading } = useSelectCart();

  return (
    <Container>
      <PageHeading>Cart page</PageHeading>

      <CartSummary items={items} isLoading={isLoading} />

      <CartItemsList items={items} isLoading={isLoading} />
    </Container>
  );
};

export default Cart;
