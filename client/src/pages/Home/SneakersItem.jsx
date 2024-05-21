import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';

const SneakersItem = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/sneakers/${item._id}`);

  return (
    <Paper
      onClick={handleClick}
      sx={{
        display: 'grid',
        width: 260,
        borderRadius: '5px 15px',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      elevation={2}
      component="li"
    >
      <img height={280} width={'100%'} src={`${BASE_URL}/images/${item.url}`} />

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
    </Paper>
  );
};

export default SneakersItem;
