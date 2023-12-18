import './DrawerList.scss';
import { useCartContext } from '../../context';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

const DrawerList = () => {
  const { items, removeItem } = useCartContext();

  const renderedSneakers = items.map((item) => {
    return <DrawerListItem item={item} onRemove={removeItem} key={item.id} />;
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
