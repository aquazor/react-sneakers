import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { setItems } from '../../redux/slices/cartSlice';
import { decrementItemCount } from '../../redux/thunks/cartThunks';

const DecrementCountButton = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelectAuth().userAuth;

  const dispatch = useDispatch();

  const handleDecrementCount = async (item) => {
    const updatedItem = {
      ...item,
      count: item.count - 1,
    };

    const cart = getCartFromLocal();

    const index = cart.findIndex((item) => item.code === updatedItem.code);

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
    <IconButton
      size="small"
      title="Remove one"
      disabled={isLoading}
      onClick={() => handleDecrementCount(item)}
    >
      <RemoveIcon />
    </IconButton>
  );
};

export default DecrementCountButton;
