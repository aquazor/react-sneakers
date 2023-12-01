import './Sneakers.scss';
import { images } from '../../constants/images';
import { SneakerCard } from '../../components';

const sneakers = [
  {
    url: images.sneakers1,
    description: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
  },
  {
    url: images.sneakers2,
    description: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
  },
  {
    url: images.sneakers3,
    description: 'Мужские Кроссовки Nike Kyrie 7',
    price: 11299,
  },
  {
    url: images.sneakers4,
    description: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
    price: 11299,
  },
  {
    url: images.sneakers5,
    description: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 10799,
  },
  {
    url: images.sneakers6,
    description: 'ММужские Кроссовки Nike LeBron XVIII',
    price: 16499,
  },
  {
    url: images.sneakers7,
    description: 'Мужские Кроссовки Nike Lebron XVIII Low',
    price: 13999,
  },
  {
    url: images.sneakers8,
    description: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
  },
  {
    url: images.sneakers9,
    description: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8999,
  },

  {
    url: images.sneakers10,
    description: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8499,
  },
  {
    url: images.sneakers11,
    description: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
  },
  {
    url: images.sneakers12,
    description: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
  },
];

const Sneakers = () => {
  const renderedSneakers = sneakers.map((card, index) => (
    <SneakerCard key={index} card={card} />
  ));

  return (
    <section className="sneakers section__padding">
      <div className="sneakers__heading">
        <h1>Все кроссовки</h1>
      </div>

      <div className="sneakers__content">{renderedSneakers}</div>
    </section>
  );
};

export default Sneakers;
