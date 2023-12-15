import './App.scss';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Drawer, Header } from './components';
import { useCartContext, useFavoritesContext, useSneakersContext } from './context';
import Section from './components/Section/Section';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { sneakers, fetchSneakers } = useSneakersContext();
  const { favorites, fetchFavorites } = useFavoritesContext();

  const { fetchCart } = useCartContext();

  useEffect(() => {
    fetchSneakers();
    fetchFavorites();
    fetchCart();
  }, [fetchSneakers, fetchFavorites, fetchCart]);

  return (
    <div className="wrapper" id="wrapper">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Section heading={'Все кроссовки'} items={sneakers} />}
          />
          <Route
            path="/favorites"
            element={<Section heading={'Понравившееся товары'} items={favorites} link />}
          />
        </Routes>
      </main>

      {isOpen && <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default App;
