import './Section.scss';
import SneakerCard from '../SneakersCard/SneakersCard';
import Input from '../Input/Input';

const Section = ({ items, searchTerm, setSearchTerm, children }) => {
  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderedItems = filteredItems.map((item) => (
    <SneakerCard key={item.id} item={item} />
  ));

  return (
    <section className="section section__padding">
      <div className="section__header">
        <div className="section__header-heading flex__center">{children}</div>
        <Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="section__content">
        <div className="section__content-items">
          {renderedItems && renderedItems.length ? renderedItems : 'Тут пока пусто...'}
        </div>
      </div>
    </section>
  );
};

export default Section;
