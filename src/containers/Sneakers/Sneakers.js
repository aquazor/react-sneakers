import './Sneakers.scss';
import { images } from '../../constants/images';
import { SneakerCard } from '../../components';
import { useContext } from 'react';
import SneakersContext from '../../context/sneakers';

const Sneakers = () => {
  const { sneakers } = useContext(SneakersContext);

  const renderedItems = sneakers.map((item) => <SneakerCard key={item.id} item={item} />);

  return (
    <section className="sneakers section__padding">
      <div className="sneakers__heading">
        <h1>Все кроссовки</h1>
        <div className="sneakers__heading-inputBlock flex__center">
          <img src={images.search} alt="Search" />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>

      <div className="sneakers__content">{renderedItems}</div>
    </section>
  );
};

export default Sneakers;
