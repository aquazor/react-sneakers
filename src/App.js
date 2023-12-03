import './App.scss';
import { useState } from 'react';
import { Drawer } from './components';
import { Header, Sneakers } from './containers';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="wrapper">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main>
        <Sneakers />
      </main>

      {isOpen && <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default App;
