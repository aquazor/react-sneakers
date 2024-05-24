import { Box, Grow } from '@mui/material';

const TabPanel = ({ children, value, name, ...rest }) => {
  return (
    <Grow in={value === name}>
      <Box
        display={value === name ? 'block' : 'none'}
        role="tabpanel"
        hidden={value !== name}
        id={`tabpanel-${name}`}
        aria-labelledby={`tab-${name}`}
        px={2}
        {...rest}
      >
        {children}
      </Box>
    </Grow>
  );
};

export default TabPanel;
