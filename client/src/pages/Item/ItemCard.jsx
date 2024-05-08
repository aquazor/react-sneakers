import { Box } from '@mui/material';
import { BASE_URL } from '../../constants';

const ItemCard = ({ item }) => {
  return (
    <Box sx={{ flexShrink: 1, width: 1, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img height={'80%'} width={'80%'} src={`${BASE_URL}/images/${item.url}`} />
      </Box>
    </Box>
  );
};

export default ItemCard;
