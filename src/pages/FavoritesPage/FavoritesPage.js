import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoriteContext } from '../../context';
import { images } from '../../constants/images';
import { Section } from '../../components';

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { favoriteItems } = useFavoriteContext();

  const link = (
    <Link to={'/'}>
      <img src={images.goBackButton} alt="Go Back" />
    </Link>
  );

  const heading = searchTerm
    ? `Поиск по запросу: "${searchTerm}"`
    : 'Понравившиеся товары';

  return (
    <Section items={favoriteItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      {link}
      <h1>{heading}</h1>
    </Section>
  );
};

export default FavoritesPage;
