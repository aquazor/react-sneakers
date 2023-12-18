import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../../context';
import { images } from '../../constants/images';
import { Section } from '../../components';

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { items } = useFavoritesContext();

  const link = (
    <Link to={'/'}>
      <img src={images.goBackButton} alt="Go Back" />
    </Link>
  );

  const heading = searchTerm
    ? `Поиск по запросу: "${searchTerm}"`
    : 'Понравившиеся товары';

  return (
    <Section items={items} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      {link}
      <h1>{heading}</h1>
    </Section>
  );
};

export default FavoritesPage;
