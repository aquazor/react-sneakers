import { Box, Typography } from '@mui/material';
import { useSneakersFilters } from '../../hooks/useSneakersFilters';
import { HomePageHelmet } from '../../components/Helmets';
import PageSkeleton from './PageSkeleton';
import FiltersPanel from './FiltersPanel';
import PaginatedList from './PaginatedList';

const Home = () => {
  const { filteredItems, isLoading } = useSneakersFilters();

  return (
    <Box sx={{ maxWidth: '1500px' }} mx={'auto'} my={2} px={2}>
      <HomePageHelmet />

      {!filteredItems && isLoading ? (
        <PageSkeleton />
      ) : (
        <Box
          display={'flex'}
          gap={2}
          sx={{
            '@media (max-width: 900px)': {
              flexDirection: 'column',
            },
          }}
        >
          <FiltersPanel />

          {filteredItems?.length > 0 ? (
            <PaginatedList items={filteredItems} />
          ) : (
            <Typography variant="h5" m={4}>
              Nothing found for your search query.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
