import './Section.scss';
import { Link } from 'react-router-dom';
import { images } from '../../constants/images';
import SneakerCard from '../SneakersCard/SneakersCard';

const Section = ({ heading, items, link }) => {
  const renderedItems = items.map((item) => <SneakerCard key={item.id} item={item} />);

  const itemsMoreThan4 = items.length > 4 ? 'section__items_moreThan4' : '';

  return (
    <section className="section section__padding">
      <div className="section__header">
        <div className="section__header-heading flex__center">
          {link && (
            <Link to={'/'}>
              <img src={images.goBackButton} alt="Go Back" />
            </Link>
          )}
          <h1>{heading}</h1>
        </div>
        <div className="section__header-inputBlock flex__center">
          <img src={images.search} alt="Search" />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>

      <div className={`section__items ${itemsMoreThan4}`}>{renderedItems}</div>
    </section>
  );
};

export default Section;
