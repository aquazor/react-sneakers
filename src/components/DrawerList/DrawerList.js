import './DrawerList.scss';
import { useCartContext } from '../../context';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

const DrawerList = () => {
  const { items: cart, removeItem: removeFromCart } = useCartContext();

  const renderedSneakers = cart.map((item) => {
    return <DrawerListItem item={item} onRemove={removeFromCart} key={item.id} />;
  });

  return (
    <ul className="drawer__content-sneakersList">
      {renderedSneakers && renderedSneakers.length
        ? renderedSneakers
        : 'Ваша корзина пуста'}
    </ul>
  );
};

export default DrawerList;
