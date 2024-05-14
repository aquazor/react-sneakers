import { useMemo, useState } from 'react';
import { createTheme } from '@mui/material';

export const useColorTheme = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('mode', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return { theme, mode, colorMode };
};
