import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../redux/thunks/cartThunks';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { setItems } from '../../redux/slices/cartSlice';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { CardTemplate, RemoveItemButton } from '../';

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

  const actionButton = (
    <RemoveItemButton disabled={isLoading} onRemove={() => removeFromCart(item)} />
  );

  return <CardTemplate item={item} actionButton={actionButton} />;
};

export default CartItem;
