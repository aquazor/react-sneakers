import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
  Divider,
  Button,
  Typography,
} from '@mui/material';
import { BRANDS } from '../../constants';

const initialHeight = 4 * 40 + 5;
const fullHeight = BRANDS.length * 40 + 20;

const SortBrand = ({ value, onChange }) => {
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
        <Typography>Brands{value.length > 0 && `: ${value.length}`}</Typography>

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
        {BRANDS.map((brand) => {
          const labelId = `brand-list-label-${brand}`;

          return (
            <ListItem key={brand} disablePadding>
              <ListItemButton
                disableGutters
                role={undefined}
                onClick={() => handleToggle(brand)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.indexOf(brand) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={{ p: 0.5, m: 0 }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={brand} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SortBrand;
