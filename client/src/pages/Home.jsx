import { Container } from '@mui/material';
import { PageHeading, SneakersItemsList, SortPanel } from '../components/';
import { useSelectSneakers } from '../hooks/useSelectSneakers';

const Home = () => {
  const { items, isLoading } = useSelectSneakers();

  return (
    <Container>
      <PageHeading>Home page</PageHeading>

      <SortPanel items={items} />

      <SneakersItemsList items={items} isLoading={isLoading} />
    </Container>
  );
};

export default Home;
