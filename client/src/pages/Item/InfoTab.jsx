import { Box } from '@mui/material';
import ItemCard from './ItemCard';
import ItemInfo from './ItemInfo';

const BaseInfoSection = ({ item, size }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      gap={3}
      sx={{
        '@media (max-width: 768px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <ItemCard item={item} maxWidth={500} maxHeight={500} borderRadius={'5px 10%'} />
      <ItemInfo item={item} size={size} />
    </Box>
  );
};

export default BaseInfoSection;
