import './App.scss';
import { Header, Sneakers } from './containers';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Sneakers />
      </main>
    </div>
  );
};

export default App;
