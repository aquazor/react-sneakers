import { useRef, useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { useSelectCart } from '../../hooks/useSelectCart';
import { addCartItem } from '../../redux/thunks/cartThunks';
import { setItems } from '../../redux/slices/cartSlice';
import { getCartFromLocal } from '../../utils/getCartFromLocal';

const ItemInfo = ({ item, size = '' }) => {
  const [selectedSize, setSelectedSize] = useState(size);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { items: cartItems } = useSelectCart();
  const { token } = useSelectAuth().userAuth;

  const select = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedSize) {
      queryParams.set('size', selectedSize);
    } else {
      queryParams.delete('size');
    }

    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  }, [selectedSize, navigate, location.pathname, location.search]);

  // Determine an instance of an item of the selected size
  const itemOfSelectedSize = selectedSize
    ? item.sizes.find((itemSize) => itemSize.value === selectedSize)
    : null;

  // Search for an item with the same itemId & size in cart
  const cartItem = cartItems?.find(
    (cartItem) => cartItem.code === itemOfSelectedSize?.code
  );

  // Get count of the found item in cart, set 0 if not found
  const cartItemCount = cartItem?.count || 0;

  // Get max count of an item of selected size (max count in stock),
  // set 0 if itemOfSelectedSize is null (size is not selected)
  const itemOfSelectedSizeMaxCount = itemOfSelectedSize?.count || 0;

  // Determine if more items can be added,
  // if count of an item with the same itemId & size in cart < max count of an item with the selected size
  const canAddMore = cartItemCount < itemOfSelectedSizeMaxCount;

  // Add button is disabled if size is selected and cant add more items of this size
  const sizeIsSelected = !!selectedSize;
  const disabled = (sizeIsSelected && !canAddMore) || isLoading;

  const handleAdd = async (item) => {
    if (disabled) {
      return;
    }

    if (!selectedSize) {
      select.current.focus();
      setIsOpen(true);
      return;
    }

    const cartItem = {
      name: item.name,
      url: item.url,
      price: item.price,
      itemId: item._id,
      size: selectedSize,
      code: itemOfSelectedSize.code,
      maxCount: itemOfSelectedSizeMaxCount,
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
      setIsLoading(true);
      await dispatch(addCartItem(cartItem));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <MenuItem
        disabled={count <= 0}
        key={index}
        value={value}
        sx={{
          width: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
    <Box
      flexGrow={1}
      display={'flex'}
      flexDirection={'column'}
      gap={3}
      minWidth={250}
      width={1}
      sx={{
        '@media (max-width: 768px)': {},
      }}
    >
      <Box>
        <Typography variant="h4" component="h1">
          {item.name}
        </Typography>
      </Box>

      <Box component={'ul'} display={'grid'} gap={2}>
        <Box component="li">
          <Typography variant="body2" color="text.secondary" textTransform={'uppercase'}>
            CODE: {itemOfSelectedSize ? itemOfSelectedSize.code : item.code}
          </Typography>
        </Box>

        <Box component="li">
          <Typography
            variant="h6"
            component="h5"
            color="text.secondary"
            textTransform={'uppercase'}
          >
            PRICE:
          </Typography>
          <Typography variant="h5" component={'p'} fontWeight={700}>
            {item.price} Kč
          </Typography>
        </Box>
      </Box>

      <FormControl
        variant="filled"
        sx={{
          width: 1,
          maxWidth: 300,
          position: 'relative',
          '@media (max-width: 768px)': {
            maxWidth: 'unset',
          },
        }}
      >
        <InputLabel id="select-size-label">Choose size</InputLabel>
        <Select
          inputRef={select}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          MenuProps={{ sx: { mt: 1 } }}
          labelId="select-size-label"
          id="select-size"
          label="Choose size"
          onChange={(e) => setSelectedSize(e.target.value)}
          value={selectedSize}
        >
          {sizesList}
        </Select>

        {cartItemCount > 0 && (
          <Typography
            variant="body2"
            component={'p'}
            position={'absolute'}
            top={-25}
            right={0}
          >
            Selected in cart:{' '}
            <Typography component={'span'} fontWeight={700} color={'success.main'}>
              {cartItemCount}
            </Typography>
          </Typography>
        )}
      </FormControl>

      <Box
        alignSelf={'flex-end'}
        display={'flex'}
        maxWidth={300}
        width={1}
        height={1}
        sx={{
          '@media (max-width: 768px)': {
            maxWidth: 'unset',
          },
        }}
      >
        <Button
          fullWidth
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
