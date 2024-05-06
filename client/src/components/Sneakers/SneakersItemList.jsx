import { Box } from '@mui/material';
import SneakersItem from './SneakersItem';
import SneakersItemLoader from './SneakersItemLoader';

const SneakersItemsList = ({ items, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return [...Array(8)].map((_, index) => (
        <Box key={index} sx={{ borderRadius: 4 }}>
          <SneakersItemLoader />
        </Box>
      ));
    }

    if (items.length === 0) {
      return <p>Could not load items...</p>;
    }

    return items.map((item) => <SneakersItem key={item.id} item={item} />);
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

export default SneakersItemsList;
