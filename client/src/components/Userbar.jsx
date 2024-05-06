import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { setToken } from '../redux/slices/authSlice';

const Userbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispath = useDispatch();
  const location = useLocation();
  const from = location?.pathname || '/';

  const handleLogout = () => {
    dispath(setToken(null));
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton color="inherit" onClick={handleOpenUserMenu}>
        <AccountBoxIcon fontSize="large" />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {!token ? (
          <MenuItem onClick={handleCloseUserMenu}>
            <Link
              to="/sign-in"
              state={{ from }}
              component={RouterLink}
              sx={{ color: 'inherit' }}
            >
              Sign In
            </Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogout}>
            <Link to={from} component={RouterLink} sx={{ color: 'inherit' }}>
              Logout
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Userbar;
