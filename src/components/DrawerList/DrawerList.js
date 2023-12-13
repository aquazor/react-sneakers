import './DrawerList.scss';
import { useContext, useEffect } from 'react';
import SneakersContext from '../../context/sneakers';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

const DrawerList = () => {
  const { cart, fetchCart, removeFromCart } = useContext(SneakersContext);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const renderedSneakers = cart.map((item, index) => (
    <DrawerListItem item={item} onRemove={removeFromCart} key={index} />
  ));

  return (
    <ul className="drawer__content-sneakersList">
      {renderedSneakers && renderedSneakers.length
        ? renderedSneakers
        : 'Ваша корзина пуста'}
    </ul>
  );
};

export default DrawerList;
