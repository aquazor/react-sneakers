import { Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      height={'50vh'}
      my={1}
      display={'grid'}
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
    >
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </div>
    </Box>
  );
};

export default NotFound;
