import { Container } from '@mui/material';
import { PageHeading, SneakersItemsList } from '../components/';
import { useSelectSneakers } from '../hooks/useSelectSneakers';

const Home = () => {
  const { items, isLoading } = useSelectSneakers();

  return (
    <Container>
      <PageHeading>Home page</PageHeading>

      <SneakersItemsList items={items} isLoading={isLoading} />
    </Container>
  );
};

export default Home;
