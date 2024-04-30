import { useDispatch } from 'react-redux';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { BASE_URL } from '../constants';
import { getCartFromLocal } from '../utils/getCartFromLocal';
import { FavoriteButton } from './';
import { addCartItem } from '../redux/thunks/cartThunks';
import { setItems } from '../redux/slices/cartSlice';
import { useSelectAuth } from '../hooks/useSelectAuth';

const SneakersCard = ({ card }) => {
  const {
    userAuth: { token },
  } = useSelectAuth();
  const dispatch = useDispatch();

  const addToCart = async (item) => {
    const cart = getCartFromLocal();

    const duplicate = cart.find((obj) => obj.id === item.id);

    if (duplicate) {
      return;
    }

    cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
    if (!token) {
      dispatch(setItems(cart));
      return;
    }

    try {
      await dispatch(addCartItem(item));
    } catch (error) {
      console.log(error);
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
            onClick={() => addToCart(card)}
            sx={{
              opacity: 0.5,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SneakersCard;
