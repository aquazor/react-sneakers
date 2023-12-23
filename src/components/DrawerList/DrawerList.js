import './DrawerList.scss';
import { useCartContext } from '../../context';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

const DrawerList = () => {
  const { cartItems } = useCartContext();

  const renderedSneakers = cartItems.map((item) => {
    return <DrawerListItem item={item} key={item.id} />;
  });

  return (
    <ul className="drawer__content-sneakersList">
      {renderedSneakers.length ? renderedSneakers : 'Ваша корзина пуста.'}
    </ul>
  );
};

export default DrawerList;
