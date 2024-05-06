import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { addCartItem } from '../../redux/thunks/cartThunks';
import { setItems } from '../../redux/slices/cartSlice';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { useSelectCart } from '../../hooks/useSelectCart';
import { BASE_URL } from '../../constants';
import { FavoriteButton } from '../';

const SneakersItem = ({ item }) => {
  const {
    userAuth: { token },
  } = useSelectAuth();
  const { items } = useSelectCart();

  const dispatch = useDispatch();

  const isInCart = Boolean(items?.find((obj) => obj.id === item.id));

  const addToCart = async (item) => {
    if (isInCart) {
      return;
    }

    const cart = getCartFromLocal();
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
            image={`${BASE_URL}/images/${item.url}`}
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
            {item.description}
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
              {item.price} грн.
            </Typography>
          </Box>

          <IconButton
            disabled={isInCart}
            onClick={() => addToCart(item)}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default SneakersItem;
