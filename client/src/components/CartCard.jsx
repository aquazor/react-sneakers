import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { BASE_URL } from '../constants';
import { FavoriteButton } from './';
import { removeCartItem } from '../redux/thunks/cartThunks';

const CartCard = ({ card }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const removeFromCart = async (item) => {
    try {
      setIsLoading(true);

      await dispatch(removeCartItem(item));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length > 0) {
        const filtered = cart.filter((obj) => obj.id !== item.id);

        localStorage.setItem('cart', JSON.stringify(filtered));
        console.log('Updated cart:', filtered);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card elevation={2} sx={{ width: 210, borderRadius: 5 }} component="li">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <CardMedia
            sx={{ height: 120, width: 130, backgroundSize: 'contain' }}
            image={`${BASE_URL}/images/${card.url}`}
          />

          <FavoriteButton absolute />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            component="h5"
            fontSize={'1rem'}
            lineHeight={1.2}
          >
            {card.description}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              textTransform={'uppercase'}
            >
              ЦЕНА:
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {card.price} грн.
            </Typography>
          </Box>

          <IconButton
            onClick={() => removeFromCart(card)}
            disabled={isLoading}
            title="Remove from cart"
            sx={{
              opacity: 0.5,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartCard;
