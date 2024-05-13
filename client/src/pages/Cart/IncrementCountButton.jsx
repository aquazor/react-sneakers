import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { setItems } from '../../redux/slices/cartSlice';
import { addCartItem } from '../../redux/thunks/cartThunks';

const IncrementCountButton = ({ item }) => {
  const [isLoading, setIsLoading] = useState();
  const { token } = useSelectAuth().userAuth;

  const dispatch = useDispatch();

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

  return (
    <IconButton
      size="small"
      title="Add one"
      onClick={() => handleIncrementCount(item)}
      disabled={!canAddMore || isLoading}
    >
      <AddIcon />
    </IconButton>
  );
};

export default IncrementCountButton;
