import { Container } from '@mui/material';
import { SneakersItemsList, SortPanel } from '../components/';
import { useSelectSneakers } from '../hooks/useSelectSneakers';

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
