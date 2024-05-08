import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';

const SneakersItem = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/sneakers/${item.id}`);

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 210,
        borderRadius: 5,
        cursor: 'pointer',
      }}
      elevation={2}
      component="li"
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <CardMedia
            sx={{ height: 120, width: 130, backgroundSize: 'contain' }}
            image={`${BASE_URL}/images/${item.url}`}
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            component="h5"
            fontSize={'1rem'}
            lineHeight={1.2}
          >
            {item.description}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 'auto',
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
      </CardContent>
    </Card>
  );
};

export default SneakersItem;
