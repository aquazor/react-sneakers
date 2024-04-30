import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ToggleTheme from './ToggleTheme';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import Userbar from './Userbar';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button component={RouterLink} to="/" sx={{ color: 'white' }}>
            LOGO
          </Button>

          <Navbar />

          <ToggleTheme />

          <Userbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
