import { useDispatch } from 'react-redux';
import { getCartFromLocal } from '../../utils/getCartFromLocal';
import { addCartItem } from '../../redux/thunks/cartThunks';
import { setItems } from '../../redux/slices/cartSlice';
import { useSelectAuth } from '../../hooks/useSelectAuth';
import { useSelectCart } from '../../hooks/useSelectCart';
import { AddCartButton, CardTemplate } from '../';

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

  const actionButton = (
    <AddCartButton onAdd={() => addToCart(item)} disabled={isInCart} />
  );

  return <CardTemplate item={item} actionButton={actionButton} />;
};

export default SneakersItem;
