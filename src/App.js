import './App.scss';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCartContext, useFavoriteContext, useSneakersContext } from './context';

import { FavoritesPage, SneakersPage } from './pages';
import { Drawer, Header } from './components';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchSneakersItems } = useSneakersContext();
  const { fetchFavoriteItems } = useFavoriteContext();
  const { fetchCartItems } = useCartContext();

  useEffect(() => {
    fetchSneakersItems();
    fetchCartItems();
    fetchFavoriteItems();
  }, [fetchSneakersItems, fetchFavoriteItems, fetchCartItems]);

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
