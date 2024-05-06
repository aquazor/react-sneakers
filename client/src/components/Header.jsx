import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Container, Box, AppBar, Toolbar, Button } from '@mui/material';
import ToggleTheme from './ToggleTheme';
import Navbar from './Navbar';
import Userbar from './Userbar';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            sx={{ color: 'white' }}
          >
            LOGO
          </Button>

          <Navbar />

          <ToggleTheme />

          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button variant="outlined" to="/cart" component={RouterLink}>
                <ShoppingCartCheckoutIcon />
              </Button>
            </Box>
            <Userbar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
