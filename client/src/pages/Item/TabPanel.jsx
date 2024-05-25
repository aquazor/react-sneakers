import { Box } from '@mui/material';

const TabPanel = ({ children, value, name, ...rest }) => {
  return (
    <Box
      display={value === name ? 'flex' : 'none'}
      justifyContent={'center'}
      role="tabpanel"
      hidden={value !== name}
      id={`tabpanel-${name}`}
      aria-labelledby={`tab-${name}`}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default TabPanel;
