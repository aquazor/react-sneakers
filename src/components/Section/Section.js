import './Section.scss';
import { useCartContext, useFavoriteContext, useSneakersContext } from '../../context';
import SneakerCard from '../SneakersCard/SneakersCard';
import Input from '../Input/Input';

const Section = ({ items, searchTerm, setSearchTerm, children }) => {
  const { isLoadingSneakers } = useSneakersContext();
  const { favoriteItems } = useFavoriteContext();
  const { cartItems } = useCartContext();

  let renderedItems;

  if (isLoadingSneakers) {
    renderedItems = [...Array(8)].map((item, index) => (
      <SneakerCard key={index} item={item} isLoading={isLoadingSneakers} />
    ));
  } else {
    const filteredItems = items?.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderedItems = filteredItems.map((item) => {
      const alreadyInFavorites = favoriteItems?.some((obj) => item.id === obj.id);
      const alreadyInCart = cartItems?.some((obj) => item.id === obj.id);

      return (
        <SneakerCard
          key={item.id}
          item={item}
          isLoading={isLoadingSneakers}
          alreadyInFavorites={alreadyInFavorites}
          alreadyInCart={alreadyInCart}
        />
      );
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
