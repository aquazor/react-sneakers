import { Box, Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { getTotalItemsPrice } from '../../utils/getTotalItemsPrice';

const CartSummary = ({ items }) => {
  const totalPrice = getTotalItemsPrice(items);

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        top: 20,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 150,
        maxHeight: 360,
        py: 1.5,
        px: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? blueGrey[900] : blueGrey[50],
        borderRadius: '10px',
        '@media (max-width: 800px)': {
          position: 'static',
        },
      }}
    >
      <Divider>
        <Chip sx={{ height: '18px' }} label="Total" size="small" />
      </Divider>

      <Box flexGrow={1} p={1} my={1}>
        <Typography variant="h6" component={'h6'}>
          Cart total:
        </Typography>
        <Typography fontWeight={700} variant="h5" component={'p'}>
          {totalPrice} Kč
        </Typography>
      </Box>

      <Box width={1}>
        <Button variant="contained" fullWidth startIcon={<ShoppingBagIcon />}>
          Checkout
        </Button>
      </Box>
    </Paper>
  );
};

export default CartSummary;
