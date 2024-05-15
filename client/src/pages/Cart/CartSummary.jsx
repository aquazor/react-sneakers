import { Box, Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { getTotalItemsPrice } from '../../utils/getTotalItemsPrice';
import { useTheme } from '@emotion/react';

const CartSummary = ({ items }) => {
  const theme = useTheme();
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
        minWidth: 230,
        maxHeight: 360,
        py: 1.5,
        px: 1,
        bgcolor: theme.palette.mode === 'dark' ? blueGrey[900] : blueGrey[50],
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: { minWidth: 150 },
      }}
    >
      <Divider>
        <Chip sx={{ height: '18px' }} label="Total" size="small" />
      </Divider>

      <Box flexGrow={1} p={1}>
        <Typography variant="h6" component={'h4'}>
          Cart total:
          <Typography fontWeight={700} variant="h5">
            {totalPrice} Kč
          </Typography>
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
