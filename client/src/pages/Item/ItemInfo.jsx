import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
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
import { setItems } from '../../redux/slices/cartSlice';
import { getCartFromLocal } from '../../utils/getCartFromLocal';

const ItemInfo = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems } = useSelectCart();

  const select = useRef(null);

  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispatch = useDispatch();

  let itemOfChosenSize = null;
  if (selectedSize) {
    itemOfChosenSize = item.sizes.find((itemSize) => itemSize.value === selectedSize);
  }

  const cartItem = cartItems?.find(
    (cartItem) => cartItem.itemId === item.id && cartItem.size === selectedSize
  );

  const cartItemCount = cartItem?.count || 0;
  const itemCountOfChosenSize = itemOfChosenSize?.count || 0; // 0 if size is not chosen
  const canAddMore = cartItemCount < itemCountOfChosenSize;

  const disabled = !!itemCountOfChosenSize && !canAddMore;

  const handleAdd = async (item) => {
    if (disabled) {
      return;
    }

    if (!selectedSize) {
      select.current.focus();
      setIsOpen(true);
      return;
    }

    const { sizes, id, ...rest } = item;

    const cartItem = {
      ...rest,
      id: nanoid(),
      itemId: item.id,
      size: selectedSize,
      maxCount: itemCountOfChosenSize,
      count: cartItemCount + 1,
    };

    const cart = getCartFromLocal();

    const index = cart.findIndex(
      (item) => item.itemId === cartItem.itemId && item.size === cartItem.size
    );

    if (index !== -1) {
      cart[index] = { ...cartItem };
    } else {
      cart.push(cartItem);
    }

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

  const sizesList = item.sizes.map((size, index) => {
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
          inputRef={select}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          MenuProps={{ sx: { mt: 1 } }}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Choose size"
          onChange={(e) => setSelectedSize(e.target.value)}
          value={selectedSize}
        >
          {sizesList}
        </Select>
      </FormControl>

      <Box alignSelf={'flex-end'} display={'flex'} height={1}>
        <Button
          disabled={disabled}
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
