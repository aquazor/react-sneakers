import { Box, Typography } from '@mui/material';
import ItemCard from './ItemCard';

const CharacteristicsSection = ({ item }) => {
  return (
    <Box
      my={2}
      display={'flex'}
      justifyContent={'space-between'}
      gap={3}
      sx={{
        '@media (max-width: 768px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <Box maxWidth={800} display={'grid'} gap={2}>
        <Typography variant="h5" component={'h4'}>
          Construction and Materials
        </Typography>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Upper Material:
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illo delectus
            officia laborum cumque maiores, optio veritatis a nam dolorem soluta fuga
            blanditiis repudiandae labore voluptatum libero, veniam assumenda nulla?
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Textile Lining:
          </Typography>

          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, blanditiis
            eligendi. Id fugiat, nulla aperiam voluptate earum dignissimos vero
            perferendis similique quia, corporis tempora soluta eius nam mollitia natus
            nesciunt.
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Insole:
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ratione et
            debitis soluta illo aliquam excepturi praesentium ullam ipsa ipsam fugit ex
            tenetur unde aperiam, modi distinctio odio error asperiores?
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Outsole:
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, vitae
            veniam laudantium aut, doloremque aliquid velit dignissimos, sapiente delectus
            quibusdam repellat molestiae tempora totam voluptatem officiis numquam illo et
            sequi.
          </Typography>
        </div>
      </Box>

      <Box minWidth={250} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography mb={2} variant="h4" component={'h2'} textAlign={'center'}>
          {item.name}
        </Typography>

        <ItemCard item={item} maxHeight={500} maxWidth={'100%'} />
      </Box>
    </Box>
  );
};

export default CharacteristicsSection;
