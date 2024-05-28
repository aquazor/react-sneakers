import { Link as RouterLink } from 'react-router-dom';
import { Box, AppBar } from '@mui/material';
import Navbar from './Navbar';

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
          <Box
            flexShrink={0}
            borderRadius={2}
            overflow={'hidden'}
            component={RouterLink}
            to="/"
          >
            <img height={50} src="./logo.webp" />
          </Box>

          <Navbar />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
