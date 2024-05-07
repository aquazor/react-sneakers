import { useDispatch } from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { setToken } from '../redux/slices/authSlice';

const ConfirmLogoutModal = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToken(null));
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth={'xs'} onClose={onClose} open={open}>
      <DialogTitle>Confirm logout</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
      >
        <ErrorOutlineIcon color="primary" fontSize="large" /> Are you sure you want to
        logout?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLogoutModal;
