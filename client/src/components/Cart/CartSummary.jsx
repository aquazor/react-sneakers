import { Box, Typography } from '@mui/material';
import { getTotalPrice } from '../../utils/getTotalPrice';

const CartSummary = ({ items }) => {
  if (!items || items?.length === 0) {
    return;
  }

  const totalPrice = getTotalPrice(items);

  return (
    <Box>
      <Typography variant="h6">Items count: {items?.length}</Typography>
      <Typography variant="h6">Total price: {totalPrice}</Typography>
    </Box>
  );
};

export default CartSummary;
