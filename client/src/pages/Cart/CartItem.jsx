import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, CardMedia, IconButton, Link, Paper, Typography } from '@mui/material';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { setItems } from '../../redux/slices/cartSlice';
import {
  addCartItem,
  decrementItemCount,
  removeCartItem,
} from '../../redux/thunks/cartThunks';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { RemoveItemButton } from '../../components';
import { BASE_URL } from '../../constants';

const CartItem = ({ item }) => {
  const {
    userAuth: { token },
  } = useSelectAuth();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const removeFromCart = async (item) => {
    if (!token) {
      const cart = getCartFromLocal();

      if (cart.length > 0) {
        const filtered = cart.filter((obj) => obj.id !== item.id);

        localStorage.setItem('cart', JSON.stringify(filtered));
        dispatch(setItems(filtered));
      }

      return;
    }

    try {
      setIsLoading(true);

      await dispatch(removeCartItem(item));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const canAddMore = item.count < item.maxCount;

  const handleIncrementCount = async (item) => {
    if (!canAddMore) {
      return;
    }

    const updatedItem = {
      ...item,
      count: item.count + 1,
    };

    const cart = getCartFromLocal();

    const index = cart.findIndex(
      (item) => item.itemId === updatedItem.itemId && item.size === updatedItem.size
    );

    if (index !== -1) {
      cart[index] = { ...updatedItem };
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (!token) {
      dispatch(setItems(cart));
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(addCartItem(updatedItem));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrementCount = async (item) => {
    const updatedItem = {
      ...item,
      count: item.count - 1,
    };

    const cart = getCartFromLocal();

    const index = cart.findIndex(
      (item) => item.itemId === updatedItem.itemId && item.size === updatedItem.size
    );

    if (updatedItem.count < 1) {
      cart.splice(index, 1);
    } else {
      cart[index] = { ...updatedItem };
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (!token) {
      dispatch(setItems(cart));
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(decrementItemCount(updatedItem));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        width: 1,
        p: 1,
        borderRadius: 5,
      }}
      component={'li'}
      elevation={2}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box width={1} display={'flex'} gap={2}>
          <CardMedia
            sx={{ flexShrink: 0, height: 120, width: 130, backgroundSize: 'contain' }}
            image={`${BASE_URL}/images/${item.url}`}
          />

          <Box width={1} display={'flex'} justifyContent={'space-between'} gap={2}>
            <div>
              <Link component={RouterLink} to={`/sneakers/${item.itemId}`}>
                {item.description}
              </Link>

              <Box component={'ul'}>
                <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                  <Typography minWidth={80} variant="body2">
                    Size:
                  </Typography>
                  <Typography variant="body1">{item.size}</Typography>
                </Box>

                <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                  <Typography minWidth={80} variant="body2">
                    Count:
                  </Typography>
                  <Typography variant="body1">{item.count}</Typography>
                </Box>
              </Box>
            </div>

            <Box display={'flex'} alignItems={'center'}>
              <IconButton
                onClick={() => handleIncrementCount(item)}
                disabled={!canAddMore || isLoading}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton disabled={isLoading} onClick={() => handleDecrementCount(item)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box flexShrink={0}>
          <Typography variant="body1">{item.price} Kč</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <RemoveItemButton disabled={isLoading} onRemove={() => removeFromCart(item)} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItem;
