import { Box, Typography } from '@mui/material';
import { getTotalItemsPrice } from '../../utils/getTotalItemsPrice';
import { getTotalItemsCount } from '../../utils/getTotalItemsCount';

const CartSummary = ({ items }) => {
  if (!items || items?.length === 0) {
    return;
  }

  const totalPrice = getTotalItemsPrice(items);
  const totalCount = getTotalItemsCount(items);

  return (
    <Box minWidth={220}>
      <Typography variant="h6">Items count: {totalCount}</Typography>
      <Typography variant="h6">Total price: {totalPrice} Kč</Typography>
    </Box>
  );
};

export default CartSummary;
