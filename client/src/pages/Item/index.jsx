import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import ItemCard from './ItemCard';
import ItemInfo from './ItemInfo';

const Item = () => {
  const { items } = useSelectSneakers();
  const { id } = useParams();

  const item = items?.find((item) => item.id === id);

  const renderContent = () => {
    if (!items) {
      return <p>Loading...</p>;
    }

    if (!item) {
      return <p>This item does not exists.</p>;
    }

    return (
      <>
        <Box display={'flex'} justifyContent={'space-between'} gap={3}>
          <ItemCard item={item} />
          <ItemInfo item={item} />
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
      <Box my={4}>{renderContent()}</Box>
    </Container>
  );
};

export default Item;
