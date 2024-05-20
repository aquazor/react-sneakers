import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Paper, Typography } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { RemoveItemButton } from '../../components';
import IncrementCountButton from './IncrementCountButton';
import DecrementCountButton from './DecrementCountButton';
import CartItemSection from './CartItemSection';
import { BASE_URL } from '../../constants';

const CartItem = ({ item }) => {
  return (
    <Paper
      sx={{
        width: 1,
        borderRadius: '10px',
        p: 1.5,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? blueGrey[900] : grey[50]),
      }}
      component={'li'}
      elevation={2}
    >
      <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
        <Box
          flexShrink={0}
          alignSelf={'center'}
          borderRadius={'10px'}
          height={140}
          width={150}
          position={'relative'}
          overflow={'hidden'}
        >
          <Box
            component={'img'}
            loading="lazy"
            height={'100%'}
            width={'100%'}
            src={`${BASE_URL}/images/${item.url}`}
          ></Box>

          <Box position={'absolute'} top={0} right={0} display={'flex'} color={'black'}>
            <RemoveItemButton item={item} />
          </Box>
        </Box>

        <CartItemSection flexBasis={'33%'} flexGrow={2} heading={'Product'}>
          <Box>
            <Link component={RouterLink} to={`/sneakers/${item.itemId}`}>
              {item.name}
            </Link>

            <Box component={'ul'}>
              <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                <Typography minWidth={80} variant="body2">
                  Size:
                </Typography>
                <Typography minWidth={'fit-content'} variant="subtitle2">
                  {item.size}
                </Typography>
              </Box>

              <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                <Typography minWidth={80} variant="body2">
                  Count:
                </Typography>
                <Typography minWidth={'fit-content'} variant="subtitle2">
                  {item.count}
                </Typography>
              </Box>

              <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                <Typography minWidth={80} variant="body2">
                  Price:
                </Typography>
                <Typography minWidth={'fit-content'} variant="subtitle2">
                  {item.price} Kč
                </Typography>
              </Box>

              <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                <Typography minWidth={80} variant="body2">
                  Code:
                </Typography>
                <Typography minWidth={'fit-content'} variant="subtitle2">
                  {item.code}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CartItemSection>

        <CartItemSection flexGrow={1} heading={'Quantity'}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1}>
            <IncrementCountButton item={item} />

            <Box>
              <Typography component={'span'}>{item.count}</Typography>
            </Box>

            <DecrementCountButton item={item} />
          </Box>
        </CartItemSection>

        <CartItemSection flexGrow={1} heading={'Price'}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography>{item.price * item.count} Kč</Typography>
          </Box>
        </CartItemSection>
      </Box>
    </Paper>
  );
};

export default CartItem;
