import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Checkbox,
} from '@mui/material';
import { SIZES } from '../../constants';

const initialHeight = 4 * 40 + 5;
const fullHeight = SIZES.length * 40 + 20;

const SortSize = ({ value, onChange }) => {
  const [height, setHeight] = useState(initialHeight);

  const handleToggle = (name) => {
    const currentIndex = value.indexOf(name);
    const newChecked = [...value];

    if (currentIndex === -1) {
      newChecked.push(name);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onChange(newChecked);
  };

  const toggleHeight = () => {
    setHeight((curr) => (curr === initialHeight ? fullHeight : initialHeight));
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={1}
      >
        <Typography>Sizes{value.length > 0 && `: ${value.length}`}</Typography>

        <Button onClick={toggleHeight} size="small">
          {height === initialHeight ? 'See more' : 'See less'}
        </Button>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List
        className={height === initialHeight ? null : 'expanded'}
        aria-expanded={height === initialHeight ? 'false' : 'true'}
        sx={{
          scrollbarWidth: 'thin',
          width: 1,
          maxHeight: initialHeight,
          overflowY: 'auto',
          transition: 'max-height 200ms',
          '&.expanded': {
            maxHeight: fullHeight,
          },
        }}
      >
        {SIZES.map((size) => {
          const labelId = `size-list-label-${size}`;

          return (
            <ListItem key={size} disablePadding>
              <ListItemButton
                disableGutters
                role={undefined}
                onClick={() => handleToggle(size)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.indexOf(size) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={{ p: 0.5, m: 0 }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={size} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SortSize;
