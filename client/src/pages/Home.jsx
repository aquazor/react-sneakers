import { Box, Container } from '@mui/material';
import { SneakersCard, SneakersCardLoader, PageHeading } from '../components/';
import { useSelectSneakers } from '../hooks/useSelectSneakers';

const HomeContent = () => {
  const { items, isLoading } = useSelectSneakers();

  const renderContent = () => {
    if (isLoading) {
      return [...Array(8)].map((_, index) => (
        <Box key={index} sx={{ borderRadius: 4 }}>
          <SneakersCardLoader />
        </Box>
      ));
    }

    if (items.length === 0) {
      return <p>Cart is empty.</p>;
    }

    return items.map((card) => <SneakersCard key={card.id} card={card} />);
  };

  return (
    <Box
      component="ul"
      my={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 210px)',
        placeContent: 'center',
        gap: 4,
      }}
    >
      {renderContent()}
    </Box>
  );
};

const Home = () => {
  return (
    <Container>
      <PageHeading>Home page</PageHeading>

      <HomeContent />
    </Container>
  );
};

export default Home;
