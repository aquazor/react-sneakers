import { Box, Typography } from '@mui/material';

const CartEmpty = () => {
  return (
    <Box
      mt={3}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <img width={120} height={120} src="/images/cart-empty.png" alt="empty cart" />

      <Box mt={2} textAlign={'center'}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Typography sx={{ opacity: 0.6 }} variant="body1">
          Add at least one pair of sneakers to create an order.
        </Typography>
      </Box>
    </Box>
  );
};

export default CartEmpty;