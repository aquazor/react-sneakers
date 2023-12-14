import './App.scss';
import { useEffect, useState } from 'react';
import { Header, Sneakers } from './containers';
import { Drawer } from './components';
import { useCartContext, useSneakersContext } from './context';

const App = () => {
  const { fetchSneakers } = useSneakersContext();
  const { fetchCart } = useCartContext();

  useEffect(() => {
    fetchSneakers();
    fetchCart();
  }, [fetchSneakers, fetchCart]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="wrapper">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main>
        <Sneakers />
      </main>

      {isOpen && <Drawer setIsOpen={setIsOpen} />}
    </div>
  );
};

export default App;
