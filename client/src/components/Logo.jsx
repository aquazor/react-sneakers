import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = () => {
  return (
    <Box
      flexShrink={0}
      borderRadius={2}
      overflow={'hidden'}
      component={RouterLink}
      to="/"
    >
      <img height={50} src="./logo.webp" />
    </Box>
  );
};

export default Logo;
