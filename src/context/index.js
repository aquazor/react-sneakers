import { useContext, createContext } from 'react';
import { CartContext, CartProvider } from './cart';
import { SneakersContext, SneakersProvider } from './sneakers';
import { FavoritesContext, FavoritesProvider } from './favorites';

const useCartContext = () => useContext(CartContext);
const useSneakersContext = () => useContext(SneakersContext);
const useFavoritesContext = () => useContext(FavoritesContext);

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
  useCartContext,
  useSneakersContext,
  CartProvider,
  SneakersProvider,
  FavoritesProvider,
  useFavoritesContext,
  GlobalProvider,
};
