import './App.scss';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCartContext, useFavoritesContext, useSneakersContext } from './context';

import { FavoritesPage, SneakersPage } from './pages';
import { Drawer, Header } from './components';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchItems: fetchSneakers } = useSneakersContext();
  const { fetchItems: fetchFavorites } = useFavoritesContext();
  const { fetchItems: fetchCart } = useCartContext();

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
          <Route path="/" element={<SneakersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>

      {isOpen && <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default App;
