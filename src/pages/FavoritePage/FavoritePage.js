import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavoriteContext } from '../../context';
import { images } from '../../constants/images';
import { SectionHeader, SneakersList } from '../../components';

const FavoritePage = () => {
  const { favoriteItems, isLoadingFavorite, errorLoadingFavorite } = useFavoriteContext();

  const heading = useMemo(
    () => (
      <>
        <Link to={'/'}>
          <img src={images.goBackButton} alt="Go Back" />
        </Link>
        <h1>Понравившиеся товары</h1>
      </>
    ),
    []
  );

  return (
    <section className="section section__padding">
      <SectionHeader heading={heading}></SectionHeader>

      <div className="section__content">
        <SneakersList
          data={favoriteItems}
          isLoading={isLoadingFavorite}
          error={errorLoadingFavorite}
        />
      </div>
    </section>
  );
};

export default FavoritePage;
