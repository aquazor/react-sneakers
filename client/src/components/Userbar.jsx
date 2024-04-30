import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/slices/authSlice';

const Userbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(setToken(null));
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
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
            <Link to="/sign-in" component={RouterLink} sx={{ color: 'inherit' }}>
              Sign In
            </Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogout}>
            <Link to="/" component={RouterLink} sx={{ color: 'inherit' }}>
              Logout
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Userbar;
