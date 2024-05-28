import { useMediaQuery, useTheme } from '@mui/material';

const itemsPerPageConfig = {
  sm: 4, // Small devices
  md: 6, // Medium devices
  lg: 8, // Medium devices
};

const useItemsPerPage = () => {
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  let itemsPerPage;

  if (isSm) {
    itemsPerPage = itemsPerPageConfig.sm;
  } else if (isMd) {
    itemsPerPage = itemsPerPageConfig.md;
  } else if (isLg) {
    itemsPerPage = itemsPerPageConfig.lg;
  } else {
    itemsPerPage = itemsPerPageConfig.md;
  }

  return itemsPerPage;
};

export default useItemsPerPage;
