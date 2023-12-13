import './App.scss';
import { useState } from 'react';
import { Header, Sneakers } from './containers';
import { Drawer } from './components';

const App = () => {
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
