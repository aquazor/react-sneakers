import { useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import ItemCard from './ItemCard';
import ItemInfo from './ItemInfo';
import { ItemPageHelmet } from '../../components/Helmets';

const Item = () => {
  const { items } = useSelectSneakers();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get('id');
  const size = queryParams.get('size') || '';

  const item = items?.find((item) => item._id === id);
  const isValidSize = item?.sizes.some((sizeObj) => sizeObj.value === size);

  const renderContent = () => {
    if (!items) {
      return <p>Loading...</p>;
    }

    if (!item) {
      return <p>This item does not exists.</p>;
    }

    return (
      <>
        <ItemPageHelmet title={item.name} description={item.name} />

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          gap={3}
          sx={{
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <ItemCard item={item} />
          <ItemInfo item={item} size={isValidSize ? size : ''} />
        </Box>

        <Box my={2}>
          <Typography variant="h5" component={'h4'}>
            Description
          </Typography>

          <Box my={2} display={'flex'} gap={3}>
            <Box>
              <Typography variant="h6" component={'h6'}>
                {item.name}
              </Typography>

              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis
                quibusdam animi quae molestiae sapiente! Hic similique harum quo. Ut
                doloremque rem facilis tempora alias ad quis quam consequatur sed ipsa!
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component={'h6'}>
                Lorem ipsum
              </Typography>

              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis
                quibusdam animi quae molestiae sapiente! Hic similique harum quo. Ut
                doloremque rem facilis tempora alias ad quis quam consequatur sed ipsa!
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Container>
      <Box my={3}>{renderContent()}</Box>
    </Container>
  );
};

export default Item;
