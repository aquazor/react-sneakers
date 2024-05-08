import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, CardMedia, Link, Paper, Typography } from '@mui/material';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { setItems } from '../../redux/slices/cartSlice';
import { removeCartItem } from '../../redux/thunks/cartThunks';
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

          <Box width={1}>
            <Link component={RouterLink} to={`/sneakers/${item.id}`}>
              {item.description}
            </Link>

            <Box component={'ul'}>
              <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                <Typography minWidth={80} variant="body2">
                  Size:
                </Typography>
                <Typography variant="body1">{item.size}</Typography>
              </Box>
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
