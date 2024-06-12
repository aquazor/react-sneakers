import { Box, AppBar } from '@mui/material';
import Navbar from './Navbar';
import Logo from './Logo';

const Header = () => {
  return (
    <AppBar position="static">
      <Box maxWidth={1750} px={2} mx={'auto'} width={1}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={1}
        >
          <Logo />

          <Navbar />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
