import { Box } from '@mui/material';
import { BASE_URL } from '../../constants';

const ItemImage = ({
  item,
  maxWidth = 200,
  maxHeight = 200,
  borderRadius = 2,
  ...rest
}) => {
  return (
    <Box
      flexShrink={1}
      width={1}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      borderRadius={borderRadius}
      overflow={'hidden'}
      sx={{
        '@media (max-width: 768px)': {
          height: 250,
        },
      }}
      {...rest}
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

export default ItemImage;
