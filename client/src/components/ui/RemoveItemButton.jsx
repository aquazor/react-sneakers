import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { setItems } from '../../redux/slices/cartSlice';
import { removeCartItem } from '../../redux/thunks/cartThunks';

const RemoveItemButton = ({ item, color = 'inherit' }) => {
  const [isLoading, setIsLoading] = useState();
  const { token } = useSelectAuth().userAuth;

  const dispatch = useDispatch();

  const removeFromCart = async (item) => {
    if (!token) {
      const cart = getCartFromLocal();

      if (cart.length > 0) {
        const filtered = cart.filter((cartItem) => cartItem.code !== item.code);

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
    <IconButton
      onClick={() => removeFromCart(item)}
      disabled={isLoading}
      size="small"
      title="Remove from cart"
      sx={{
        color,
        opacity: 0.5,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <ClearIcon fontSize="small" />
    </IconButton>
  );
};

export default RemoveItemButton;
