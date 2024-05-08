import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { useSelectCart } from '../../hooks/useSelectCart';
import { addCartItem } from '../../redux/thunks/cartThunks';
import { setItems } from '../../redux/slices/sneakersSlice';
import { getCartFromLocal } from '../../utils/getCartFromLocal';

const ItemInfo = ({ item }) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems } = useSelectCart();

  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispatch = useDispatch();

  const isInCart = Boolean(cartItems?.find((cartItem) => cartItem.id === item.id));

  const handleAdd = async (item) => {
    if (isInCart) {
      return;
    }

    if (!value) {
      setIsOpen(true);
      return;
    }

    const cartItem = { ...item, size: value };

    const cart = getCartFromLocal();
    cart.push(cartItem);

    localStorage.setItem('cart', JSON.stringify(cart));

    if (!token) {
      dispatch(setItems(cart));
      return;
    }

    try {
      await dispatch(addCartItem(cartItem));
    } catch (error) {
      console.log(error);
    }
  };

  const sizes = item.sizes.map((size, index) => {
    const { count, value } = size;

    let infoText = '';
    if (count === 1) {
      infoText = 'Last pair!';
    } else if (count === 2) {
      infoText = 'Two pairs left';
    }

    return (
      <MenuItem disabled={count <= 0} key={index} value={size.value}>
        <Box
          width={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {value}
          {infoText && (
            <Typography
              textAlign={'end'}
              color={count === 1 ? 'warning.main' : 'text.secondary'}
              variant="body2"
            >
              {infoText}
            </Typography>
          )}
        </Box>
      </MenuItem>
    );
  });

  return (
    <Box flexShrink={0} flexGrow={1} display={'flex'} flexDirection={'column'} gap={3}>
      <Box>
        <Typography variant="h4" component="h1">
          {item.description}
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          textTransform={'uppercase'}
        >
          PRICE:
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {item.price} Kč
        </Typography>
      </Box>

      <FormControl variant="filled" sx={{ maxWidth: 250 }}>
        <InputLabel id="select-filled-label">Choose size</InputLabel>
        <Select
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          MenuProps={{ sx: { mt: 1 } }}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Choose size"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        >
          {sizes}
        </Select>
      </FormControl>

      <Box alignSelf={'flex-end'} display={'flex'} height={1}>
        <Button
          disabled={isInCart}
          variant="contained"
          onClick={() => handleAdd(item)}
          size="large"
          sx={{ display: 'flex', gap: 1, mt: 'auto' }}
        >
          <ShoppingCartIcon /> Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ItemInfo;
