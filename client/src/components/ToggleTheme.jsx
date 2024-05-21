import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton } from '@mui/material';
import { useThemeContext } from '../theme/useThemeContext';

const ToggleTheme = ({ className }) => {
  const { mode, colorMode } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...className }}>
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default ToggleTheme;
