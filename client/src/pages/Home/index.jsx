import { Container } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import { SortPanel } from '../../components';
import SneakersItemsList from './SneakersItemsList';

const Home = () => {
  const { items, isLoading } = useSelectSneakers();

  return (
    <Container>
      <SortPanel items={items} />

      <SneakersItemsList items={items} isLoading={isLoading} />
    </Container>
  );
};

export default Home;
