import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useSelectCart } from '../hooks/useSelectCart';
import ToggleTheme from './ToggleTheme';
import Navbar from './Navbar';
import Authbar from './Authbar';
import { getTotalItemsCount } from '../utils/getTotalItemsCount';

const Header = () => {
  const { items } = useSelectCart();

  const totalItemsCount = getTotalItemsCount(items);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button component={RouterLink} to="/" variant="contained" size="large">
            LOGO
          </Button>

          <Navbar />

          <ToggleTheme />

          <Box display={'flex'} alignItems={'center'}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
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
            </Box>

            <Authbar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
