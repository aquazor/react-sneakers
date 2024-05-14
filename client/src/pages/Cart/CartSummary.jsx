import { Box, Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { getTotalItemsPrice } from '../../utils/getTotalItemsPrice';
import { getTotalItemsCount } from '../../utils/getTotalItemsCount';

const CartSummary = ({ items }) => {
  if (!items || items?.length === 0) {
    return;
  }

  const totalPrice = getTotalItemsPrice(items);
  const totalCount = getTotalItemsCount(items);

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 250,
        maxHeight: 360,
        top: 20,
        py: 1.5,
        px: 1,
        borderRadius: '5px 20px 20px 5px',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? blueGrey[900] : blueGrey[50],
      }}
    >
      <Divider>
        <Chip sx={{ height: '18px' }} label="Total" size="small" />
      </Divider>

      <Box flexGrow={1} p={2}>
        <Typography variant="h6">Items count: {totalCount}</Typography>
        <Typography variant="h6">Total price: {totalPrice} Kč</Typography>
      </Box>

      <Box width={1}>
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: '5px 5px 20px 5px' }}
          startIcon={<ShoppingBagIcon />}
        >
          Checkout
        </Button>
      </Box>
    </Paper>
  );
};

export default CartSummary;
