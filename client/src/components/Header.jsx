import { Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { blue } from '@mui/material/colors';
import { useSelectCart } from '../hooks/useSelectCart';
import { getTotalItemsCount } from '../utils/getTotalItemsCount';
import ToggleTheme from './ToggleTheme';
import Authbar from './Authbar';

const Header = () => {
  const { items } = useSelectCart();

  const totalItemsCount = getTotalItemsCount(items);

  return (
    <AppBar position="static">
      <Box maxWidth={1750} px={2} mx={'auto'} width={1}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={1}
        >
          <Box borderRadius={2} overflow={'hidden'} component={RouterLink} to="/">
            <img height={50} src="./logo.webp" />
          </Box>

          <Box display={'flex'} alignItems={'center'}>
            <ToggleTheme />

            <IconButton color="inherit" to="/cart" component={RouterLink}>
              <ShoppingCartCheckoutIcon fontSize="large" />

              {items?.length > 0 && (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'absolute'}
                  top={0}
                  right={0}
                  width={18}
                  height={18}
                  borderRadius={'50%'}
                  bgcolor={blue[200]}
                  fontSize={'12px'}
                  color={'black'}
                  lineHeight={1}
                >
                  {totalItemsCount}
                </Box>
              )}
            </IconButton>

            <Authbar />
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
