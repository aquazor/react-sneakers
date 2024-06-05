import { Box, Typography } from '@mui/material';
import ItemImage from './ItemImage';

const DescriptionSection = ({ item }) => {
  return (
    <Box
      my={2}
      display={'flex'}
      justifyContent={'space-between'}
      gap={3}
      sx={{
        '@media (max-width: 768px)': {
          flexDirection: 'column',
        },
      }}
    >
      <Box minWidth={250} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography mb={2} variant="h4" component={'h2'} textAlign={'center'}>
          {item.name}
        </Typography>

        <ItemImage item={item} maxHeight={500} maxWidth={'100%'} />
      </Box>

      <Box maxWidth={800} display={'grid'} gap={2}>
        <Typography variant="h5" component={'h4'}>
          Design and Aesthetics
        </Typography>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Styling
          </Typography>

          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil eum, veniam,
            laborum laudantium nam corporis ea quibusdam eveniet id ducimus voluptates sed
            blanditiis? Voluptatem placeat aliquid expedita cumque veniam aut.
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Silhouette
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quasi ex
            esse tempore sed, perspiciatis libero veniam autem nam accusantium sequi fuga
            qui consequuntur perferendis delectus odit, recusandae aliquid praesentium.
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Colorways
          </Typography>

          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto nihil iste
            consectetur! Libero earum optio eveniet nisi labore modi atque laborum et
            ullam? Tempore deserunt id rem ut vel culpa.
          </Typography>
        </div>

        <div>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" component={'h5'}>
            Signature Branding
          </Typography>

          <Typography>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est nulla autem
            facere, distinctio odit at, labore ad atque obcaecati nesciunt illum numquam
            consectetur asperiores dolor. Ipsum hic culpa sequi maxime.
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default DescriptionSection;
