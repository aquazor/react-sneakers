import { Box, Typography } from '@mui/material';

const PageHeading = ({ textAlign = 'center', children }) => {
  return (
    <Box my={4}>
      <Typography component="h1" variant="h4" textAlign={textAlign}>
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeading;
