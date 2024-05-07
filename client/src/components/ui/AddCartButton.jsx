import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';

const AddCartButton = ({ disabled, onAdd }) => {
  return (
    <IconButton
      disabled={disabled}
      onClick={onAdd}
      color="primary"
      sx={{
        transition: 'opacity 200ms',
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
          '& svg': {
            scale: '1.1',
          },
        },
      }}
    >
      <ShoppingCartIcon
        sx={{
          transition: 'scale 200ms',
        }}
      />
    </IconButton>
  );
};

export default AddCartButton;
