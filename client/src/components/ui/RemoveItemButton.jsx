import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RemoveItemButton = ({ disabled, onRemove }) => {
  return (
    <IconButton
      onClick={onRemove}
      disabled={disabled}
      title="Remove from cart"
      sx={{
        opacity: 0.5,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default RemoveItemButton;
