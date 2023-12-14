import { useContext } from 'react';
import CartContext from './cart';
import SneakersContext from './sneakers';
import { CartProvider } from './cart';
import { SneakersProvider } from './sneakers';

const useCartContext = () => useContext(CartContext);
const useSneakersContext = () => useContext(SneakersContext);

export { useCartContext, useSneakersContext, CartProvider, SneakersProvider };
