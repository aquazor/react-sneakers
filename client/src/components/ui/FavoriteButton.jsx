import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { IconButton } from '@mui/material';

const FavoriteButton = ({ absolute, ...rest }) => {
  const position = absolute && {
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <IconButton
      {...rest}
      title="Add to favorite"
      sx={{
        position,
        color: 'pink',
        opacity: 0.65,
        transition: 'opacity 200ms',
        '&:hover': {
          opacity: 1,
          '& svg': {
            scale: '1.1',
          },
        },
      }}
    >
      <FavoriteRoundedIcon
        sx={{
          transition: 'scale 200ms',
        }}
      />
    </IconButton>
  );
};

export default FavoriteButton;
