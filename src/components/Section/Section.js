import './Section.scss';
import { useSneakersContext } from '../../context';
import SneakerCard from '../SneakersCard/SneakersCard';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Input from '../Input/Input';

const Section = ({ items, searchTerm, setSearchTerm, children }) => {
  const { isLoadingSneakers } = useSneakersContext();

  let renderedItems;

  if (isLoadingSneakers) {
    renderedItems = [...Array(8)].map((_, index) => (
      <CardSkeleton className={'sneakers__card'} key={index} />
    ));
  } else {
    const filteredItems = items?.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderedItems = filteredItems.map((item) => {
      return <SneakerCard key={item.id} item={item} isLoading={isLoadingSneakers} />;
    });
  }

  return (
    <section className="section section__padding">
      <div className="section__header">
        <div className="section__header-heading flex__center">{children}</div>
        <Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="section__content">
        <div className="section__content-items">
          {renderedItems.length ? renderedItems : 'Тут пока пусто...'}
        </div>
      </div>
    </section>
  );
};

export default Section;
