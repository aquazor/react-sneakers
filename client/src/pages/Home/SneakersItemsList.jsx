import { Box } from '@mui/material';
import SneakersItem from './SneakersItem';

const SneakersItemsList = ({ items, isLoading }) => {
  const renderContent = () => {
    if (!items && isLoading) {
      return <p>Loading...</p>;
    }

    if (items?.length === 0) {
      return <p>Could not load items...</p>;
    }

    return items?.map((item) => <SneakersItem key={item.id} item={item} />);
  };

  return (
    <Box
      component="ul"
      my={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        placeContent: 'center',
        gap: 3,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default SneakersItemsList;
