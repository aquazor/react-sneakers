import './Sneakers.scss';
import { images } from '../../constants/images';
import { SneakerCard } from '../../components';
import { useContext, useEffect } from 'react';
import SneakersContext from '../../context/sneakers';

const Sneakers = () => {
  const { sneakers, fetchSneakers } = useContext(SneakersContext);

  useEffect(() => {
    fetchSneakers();
  }, []);

  const renderedCards = sneakers.map((card, index) => (
    <SneakerCard key={index} card={card} />
  ));

  return (
    <section className="sneakers section__padding">
      <div className="sneakers__heading">
        <h1>Все кроссовки</h1>
        <div className="sneakers__heading-inputBlock flex__center">
          <img src={images.search} alt="Search" />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>

      <div className="sneakers__content">{renderedCards}</div>
    </section>
  );
};

export default Sneakers;
