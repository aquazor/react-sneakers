import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, MenuItem, Paper, Slide, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';

const SneakersItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizesList = item.sizes.map((size, index) => {
    const { count, value } = size;

    return (
      <MenuItem
        component={RouterLink}
        to={`/sneakers?id=${item._id}&size=${value}`}
        key={index}
        disabled={count <= 0}
        value={value}
        sx={{
          width: 1,
          justifyContent: 'center',
          borderRadius: 2,
          bgcolor: 'GrayText',
          color: 'white',
        }}
      >
        {value}
      </MenuItem>
    );
  });

  return (
    <Paper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        display: 'grid',
        width: 260,
        borderRadius: '5px 15px',
        overflow: 'hidden',
      }}
      elevation={2}
      component="li"
    >
      <RouterLink to={`/sneakers?id=${item._id}`}>
        <img height={280} width={'100%'} src={`${BASE_URL}/images/${item.url}`} />
      </RouterLink>

      <Box p={2} display={'grid'}>
        <Box>
          <Typography
            variant="subtitle1"
            component="h5"
            fontSize={'1rem'}
            lineHeight={1.2}
          >
            {item.name}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              textTransform={'uppercase'}
            >
              PRICE:
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {item.price} Kč
            </Typography>
          </Box>
        </Box>
      </Box>

      {isHovered && (
        <Slide direction={'left'} in={isHovered}>
          <Box
            position={'absolute'}
            top={0}
            right={0}
            height={1}
            maxWidth={'70px'}
            display={'flex'}
            flexWrap={'wrap'}
            gap={1}
            p={1}
            bgcolor={'gray'}
            component={'ul'}
          >
            {sizesList}
          </Box>
        </Slide>
      )}
    </Paper>
  );
};

export default SneakersItem;
