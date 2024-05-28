import { Link as RouterLink, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Typography } from '@mui/material';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { useState } from 'react';
import ConfirmLogoutModal from './ConfirmLogoutModal';

const Authbar = () => {
  const { token } = useSelectAuth().userAuth;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const location = useLocation();
  const from = location?.pathname || '/';

  return (
    <>
      {!token ? (
        <IconButton
          title="Sign In"
          to="/sign-in"
          state={{ from }}
          component={RouterLink}
          sx={{ color: 'inherit' }}
        >
          <LoginIcon fontSize="large" />

          <Typography position={'absolute'} bottom={-2} fontSize={'10px'}>
            Sign In
          </Typography>
        </IconButton>
      ) : (
        <IconButton title="Logout" onClick={handleOpen} sx={{ color: 'inherit' }}>
          <LogoutIcon fontSize="large" />

          <Typography position={'absolute'} bottom={-2} fontSize={'10px'}>
            Logout
          </Typography>
        </IconButton>
      )}

      <ConfirmLogoutModal open={isOpen} onClose={handleClose} />
    </>
  );
};

export default Authbar;
