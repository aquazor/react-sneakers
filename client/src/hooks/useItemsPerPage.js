import { useMediaQuery, useTheme } from '@mui/material';

const itemsPerPageConfig = {
  sm: 3, // Small devices (< 600px)
  md: 6, // Medium devices (600px - 1199px)
  lg: 8, // Medium devices (=> 1200px)
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
