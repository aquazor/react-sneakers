import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ToggleTheme from './ToggleTheme';
import Button from '@mui/material/Button';
import { Box, IconButton } from '@mui/material';
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

          <Box display={'flex'} gap={1}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <IconButton to="/cart" component={RouterLink} sx={{ color: 'inherit' }}>
                <ShoppingCartIcon />
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
