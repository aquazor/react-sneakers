import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Paper, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';
import { RemoveItemButton } from '../../components';
import IncrementCountButton from './IncrementCountButton';
import DecrementCountButton from './DecrementCountButton';

const CartItem = ({ item }) => {
  return (
    <Paper
      sx={{
        width: 1,
        borderRadius: '5px 15px',
        p: 1.5,
      }}
      component={'li'}
      elevation={2}
    >
      <Box display={'flex'}>
        <Box flexShrink={0} borderRadius={'5px 15px'} overflow={'hidden'}>
          <img
            loading="lazy"
            height={140}
            width={150}
            src={`${BASE_URL}/images/${item.url}`}
          />
        </Box>

        <Box
          flexGrow={1}
          display={'grid'}
          gridTemplateColumns={'1fr 1fr auto auto'}
          position={'relative'}
          px={2}
          py={1}
          gap={2}
        >
          <Box display={'grid'} gridTemplateRows={'auto 1fr'} gap={1}>
            <Typography
              variant={'body2'}
              component={'h5'}
              textTransform={'uppercase'}
              textAlign={'center'}
              lineHeight={1}
            >
              PRODUCT
            </Typography>

            <Box my={'auto'}>
              <Link component={RouterLink} to={`/sneakers/${item.itemId}`}>
                {item.description}
              </Link>

              <Box component={'ul'}>
                <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                  <Typography minWidth={80} variant="body2">
                    Size:
                  </Typography>
                  <Typography variant="body1">{item.size}</Typography>
                </Box>

                <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                  <Typography minWidth={80} variant="body2">
                    Count:
                  </Typography>
                  <Typography variant="body1">{item.count}</Typography>
                </Box>

                <Box display={'flex'} alignItems={'center'} gap={1} component={'li'}>
                  <Typography minWidth={80} variant="body2">
                    Code:
                  </Typography>
                  <Typography variant="body2">{item.code}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box display={'grid'} gridTemplateRows={'auto 1fr'} gap={1}>
            <Typography
              variant={'body2'}
              component={'h5'}
              textTransform={'uppercase'}
              textAlign={'center'}
              lineHeight={1}
              mb={'auto'}
            >
              QTY
            </Typography>

            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1}>
              <IncrementCountButton item={item} />

              <Box>
                <Typography component={'span'}>{item.count}</Typography>
              </Box>

              <DecrementCountButton item={item} />
            </Box>
          </Box>

          <Box display={'grid'} gridTemplateRows={'auto 1fr'} gap={1}>
            <Typography
              variant={'body2'}
              component={'h5'}
              textTransform={'uppercase'}
              textAlign={'center'}
              lineHeight={1}
              mb={'auto'}
            >
              PRICE
            </Typography>

            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="body1">{item.price} Kč</Typography>
            </Box>
          </Box>

          <Box
            position={'absolute'}
            top={-10}
            right={-10}
            display={'flex'}
            alignItems={'flex-end'}
          >
            <RemoveItemButton item={item} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItem;
