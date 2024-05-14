import { Box, Chip, Divider } from '@mui/material';

const CartItemSection = ({ heading = 'Section', children }) => {
  return (
    <Box display={'grid'} gridTemplateRows={'auto 1fr'} gap={1}>
      <Divider sx={{ opacity: 0.75 }}>
        <Chip variant="outlined" sx={{ height: '18px' }} label={heading} size="small" />
      </Divider>

      {children}
    </Box>
  );
};

export default CartItemSection;
