import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelectCart } from '../hooks/useSelectCart';
import { getTotalItemsCount } from '../utils/getTotalItemsCount';
import ToggleTheme from './ToggleTheme';
import Authbar from './Authbar';

const Navbar = () => {
  const { items } = useSelectCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalItemsCount = getTotalItemsCount(items);

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box display={{ sm: 'flex', xs: 'none' }}>
        <ToggleTheme />
      </Box>

      <Box display={'flex'}>
        <IconButton color="inherit" to="/cart" component={RouterLink}>
          <ShoppingCartCheckoutIcon fontSize="large" />

          {items?.length > 0 && (
            <Box
              position={'absolute'}
              top={0}
              right={0}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              width={18}
              height={18}
              borderRadius={'50%'}
              bgcolor={blue[200]}
              fontSize={'12px'}
              color={'black'}
              lineHeight={1}
            >
              {totalItemsCount}
            </Box>
          )}
        </IconButton>

        <IconButton
          onClick={handleClick}
          aria-describedby="menu-button"
          color="inherit"
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box display={{ sm: 'flex', xs: 'none' }}>
        <Authbar />
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem sx={{ justifyContent: 'center' }} disableRipple>
          <ToggleTheme />
        </MenuItem>

        <MenuItem sx={{ justifyContent: 'center' }} disableRipple>
          <Authbar />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
