import { createContext, useContext } from 'react';
import { CartContext, CartProvider } from './cart';
import { SneakersContext, SneakersProvider } from './sneakers';
import { FavoriteContext, FavoriteProvider } from './favorite';

const useSneakersContext = () => useContext(SneakersContext);
const useCartContext = () => useContext(CartContext);
const useFavoriteContext = () => useContext(FavoriteContext);

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  return (
    <CartProvider>
      <SneakersProvider>
        <FavoriteProvider>
          <GlobalContext.Provider value={''}>{children}</GlobalContext.Provider>
        </FavoriteProvider>
      </SneakersProvider>
    </CartProvider>
  );
};

export {
  CartProvider,
  FavoriteProvider,
  SneakersProvider,
  useCartContext,
  useFavoriteContext,
  useSneakersContext,
  GlobalProvider,
};
