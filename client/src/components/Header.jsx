import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Container, Box, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import ToggleTheme from './ToggleTheme';
import Navbar from './Navbar';
import Userbar from './Userbar';

const Header = () => {
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <IconButton color="inherit" to="/cart" component={RouterLink}>
                <ShoppingCartCheckoutIcon fontSize="large" />
              </IconButton>
            </Box>

            <Userbar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
