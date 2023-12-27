import './DrawerList.scss';
import { useCartContext } from '../../context';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

const DrawerList = () => {
  const { cartItems, errorLoadingCart } = useCartContext();

  let renderedItems = errorLoadingCart;

  if (!errorLoadingCart) {
    renderedItems = cartItems.map((item) => {
      return <DrawerListItem item={item} key={item.id} />;
    });
  }

  return (
    <ul className="drawer__content-sneakersList">
      {renderedItems.length ? renderedItems : 'Ваша корзина пуста.'}
    </ul>
  );
};

export default DrawerList;
