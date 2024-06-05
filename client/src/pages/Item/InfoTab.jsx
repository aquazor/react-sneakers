import { Box } from '@mui/material';
import ItemImage from './ItemImage';
import ItemInfo from './ItemInfo';

const BaseInfoSection = ({ item, size }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      gap={3}
      width={1}
      sx={{
        '@media (max-width: 768px)': {
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '75%',
        },
      }}
    >
      <ItemImage item={item} maxWidth={500} maxHeight={650} borderRadius={'5px 10%'} />
      <ItemInfo item={item} size={size} />
    </Box>
  );
};

export default BaseInfoSection;
