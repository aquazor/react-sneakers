import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const GoHomeLink = () => {
  return (
    <Link to={'/'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <NavigateBeforeIcon /> Home page
      </Box>
    </Link>
  );
};

export default GoHomeLink;
