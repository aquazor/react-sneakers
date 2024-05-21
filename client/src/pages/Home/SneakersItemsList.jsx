import { Box } from '@mui/material';
import SneakersItem from './SneakersItem';

const SneakersItemsList = ({ items }) => {
  return (
    <Box
      component="ul"
      my={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 260px)',
        placeContent: 'center',
        gap: 3,
      }}
    >
      {items?.map((item) => (
        <SneakersItem key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default SneakersItemsList;
