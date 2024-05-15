import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Paper, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';
import { RemoveItemButton } from '../../components';
import IncrementCountButton from './IncrementCountButton';
import DecrementCountButton from './DecrementCountButton';
import CartItemSection from './CartItemSection';
import { blueGrey, grey } from '@mui/material/colors';
import { useTheme } from '@emotion/react';

const CartItem = ({ item }) => {
  const theme = useTheme();

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
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={2}
        sx={{
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 1,
          },
        }}
      >
        <Box
          flexShrink={0}
          borderRadius={'10px'}
          height={140}
          width={150}
          overflow={'hidden'}
          sx={{
            [theme.breakpoints.down('md')]: {
              alignSelf: 'center',
              width: '90%',
              height: 300,
            },
            [theme.breakpoints.down('sm')]: {
              width: '75%',
              height: 150,
            },
          }}
        >
          <Box
            component={'img'}
            loading="lazy"
            height={'100%'}
            width={'100%'}
            src={`${BASE_URL}/images/${item.url}`}
          ></Box>
        </Box>

        <Box
          display={'grid'}
          position={'relative'}
          gridTemplateColumns={'1fr minmax(auto, 180px) minmax(auto, 180px)'}
          flexGrow={1}
          gap={2}
          sx={{
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr minmax(auto, 130px) minmax(auto, 130px)',
              gap: 1,
            },
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <CartItemSection heading={'Product'}>
            <Box
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'grid',
                  placeContent: 'center',
                },
              }}
            >
              <Link component={RouterLink} to={`/sneakers/${item.itemId}`}>
                {item.description}
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

          <CartItemSection heading={'Quantity'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1}>
              <IncrementCountButton item={item} />

              <Box>
                <Typography component={'span'}>{item.count}</Typography>
              </Box>

              <DecrementCountButton item={item} />
            </Box>
          </CartItemSection>

          <CartItemSection heading={'Price'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <Typography>{item.price * item.count} Kč</Typography>
            </Box>
          </CartItemSection>

          <Box
            position={'absolute'}
            bottom={-5}
            right={-5}
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
