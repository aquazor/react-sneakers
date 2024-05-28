import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useThemeContext } from '../theme/useThemeContext';

const ToggleTheme = () => {
  const { mode, colorMode } = useThemeContext();

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ToggleTheme;
