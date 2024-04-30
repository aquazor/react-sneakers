import { Box, Typography } from '@mui/material';

const PageHeading = ({ children }) => {
  return (
    <Box my={4}>
      <Typography component="h1" variant="h4" textAlign="center">
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeading;
