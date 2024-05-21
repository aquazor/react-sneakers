import { Box } from '@mui/material';
import { BASE_URL } from '../../constants';

const ItemCard = ({ item }) => {
  return (
    <Box
      flexShrink={1}
      width={1}
      maxWidth={500}
      maxHeight={500}
      borderRadius={'5px 10%'}
      overflow={'hidden'}
      sx={{
        '@media (max-width: 600px)': {
          maxWidth: 300,
          height: 200,
        },
      }}
    >
      <Box
        component={'img'}
        height={'100%'}
        width={'100%'}
        src={`${BASE_URL}/images/${item.url}`}
      ></Box>
    </Box>
  );
};

export default ItemCard;
