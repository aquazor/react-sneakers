import { Box } from '@mui/material';
import CartItem from './CartItem';

const CartItemsList = ({ items }) => {
  return (
    <Box component={'ul'} flexGrow={2} display={'flex'} flexDirection={'column'} gap={3}>
      {items?.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default CartItemsList;
