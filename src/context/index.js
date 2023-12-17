import { createContext, useContext } from 'react';
import { CartContext, CartProvider } from './cart';
import { SneakersContext, SneakersProvider } from './sneakers';
import { FavoritesContext, FavoritesProvider } from './favorites';

const useCartContext = () => useContext(CartContext);
const useFavoritesContext = () => useContext(FavoritesContext);
const useSneakersContext = () => useContext(SneakersContext);

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  return (
    <CartProvider>
      <SneakersProvider>
        <FavoritesProvider>
          <GlobalContext.Provider value={''}>{children}</GlobalContext.Provider>
        </FavoritesProvider>
      </SneakersProvider>
    </CartProvider>
  );
};

export {
  CartProvider,
  FavoritesProvider,
  SneakersProvider,
  useCartContext,
  useFavoritesContext,
  useSneakersContext,
  GlobalProvider,
};
